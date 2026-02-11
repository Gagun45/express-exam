import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { userService } from "../services/user.service";

export const userController = {
    updateAccountType: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const user = req.res.locals.user as IUser;
            const { accountType } = req.body as {
                accountType: UserAccountTypesEnum;
            };
            const userId = String(req.params["userId"]);
            if (userId === user._id) {
                throw new ApiError("Forbidden", StatusCodesEnum.FORBIDDEN);
            }
            const updatedUser = await userService.updateAccountType(
                userId,
                accountType,
            );
            const publicUser = userPresenter.toPublicUser(updatedUser);
            res.status(StatusCodesEnum.CREATED).json(publicUser);
        } catch (e) {
            next(e);
        }
    },
};
