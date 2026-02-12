import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { ApiError } from "../errors/api.error";
import { userPresenter } from "../presenters/user.presenter";
import { userService } from "../services/user.service";

export const userController = {
    updateAccountType: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const currentUserId = res.locals.userId as string;
            const { accountType } = req.body as {
                accountType: UserAccountTypesEnum;
            };
            const targetUserId = String(req.params["userId"]);
            if (currentUserId === targetUserId) {
                throw new ApiError("Forbidden", StatusCodesEnum.FORBIDDEN);
            }
            const updatedUser = await userService.updateAccountType(
                targetUserId,
                accountType,
            );
            const publicUser = userPresenter.toPublicUser(updatedUser);
            res.status(StatusCodesEnum.CREATED).json(publicUser);
        } catch (e) {
            next(e);
        }
    },
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userService.getAll();
            const publicUsers = users.map((user) =>
                userPresenter.toPublicUser(user),
            );
            res.status(StatusCodesEnum.OK).json({ data: publicUsers });
        } catch (e) {
            next(e);
        }
    },
};
