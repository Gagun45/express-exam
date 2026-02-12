import { NextFunction, Request, Response } from "express";

import { rolePermissions } from "../constants/role-permissions.constants";
import { PermissionsEnum } from "../enums/permissions.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypesEnum } from "../enums/token-types.enum";
import { ApiError } from "../errors/api.error";
import { getTokenFromHeader } from "../helpers/jwt.helper";
import { IUser } from "../interfaces/user.interface";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";

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

            const user = await userService.findOneByParams({
                _id: tokenPayload.userId,
            });
            if (!user)
                throw new ApiError(
                    "User not found",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            if (user.isBanned)
                throw new ApiError("User is banned", StatusCodesEnum.FORBIDDEN);
            res.locals.userId = tokenPayload.userId;
            res.locals.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkPermission: (permission: PermissionsEnum) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const user = res.locals.user as IUser;
            const userRole = user.role;
            const permissions = rolePermissions[userRole];
            if (!permissions.includes(permission)) {
                throw new ApiError("Forbidden", StatusCodesEnum.FORBIDDEN);
            }
            next();
        };
    },
};
