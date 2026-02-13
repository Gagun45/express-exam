import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypesEnum } from "../enums/token-types.enum";
import { ApiError } from "../errors/api.error";
import { getTokenFromHeader } from "../helpers/jwt.helper";
import { userRepository } from "../repositories/user.repository";
import { tokenService } from "../services/token.service";

export const authMiddleware = {
    checkAccessToken: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const accessToken = getTokenFromHeader(req.headers.authorization);

            const tokenPayload = tokenService.verifyToken(
                accessToken,
                TokenTypesEnum.ACCESS,
            );

            const user = await userRepository.findOneByParams({
                _id: tokenPayload.userId,
            });
            if (!user)
                throw new ApiError(
                    "Unauthorized",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            if (user.isBanned)
                throw new ApiError("User is banned", StatusCodesEnum.FORBIDDEN);
            res.locals.currentUserId = user._id.toString();
            res.locals.currentUser = user;
            next();
        } catch (e) {
            next(e);
        }
    },
};
