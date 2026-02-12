import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { userPresenter } from "../presenters/user.presenter";
import { userService } from "../services/user.service";

export const userController = {
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
    changeAccountType: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { currentUser } = res.locals;
            const targetUserId = String(req.params["userId"]);
            const accountType = req.body.accountType as UserAccountTypesEnum;

            const updatedUser = await userService.changeAccountType(
                targetUserId,
                currentUser,
                accountType,
            );
            const publicUser = userPresenter.toPublicUser(updatedUser);
            res.status(StatusCodesEnum.CREATED).json(publicUser);
        } catch (e) {
            next(e);
        }
    },
    changeRole: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { currentUser } = res.locals;
            const targetUserId = String(req.params["userId"]);
            const newRole = req.body.role as UserRolesEnum;
            const data = await userService.changeRole(
                targetUserId,
                currentUser,
                newRole,
            );
            const publicUser = userPresenter.toPublicUser(data);
            res.status(StatusCodesEnum.OK).json(publicUser);
        } catch (e) {
            next(e);
        }
    },
    banHandler: (newBanStatus: boolean) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { currentUser } = res.locals;
                const targetUserId = String(req.params["userId"]);
                const data = await userService.changeBanStatus(
                    targetUserId,
                    currentUser,
                    newBanStatus,
                );
                const publicUser = userPresenter.toPublicUser(data);
                res.status(StatusCodesEnum.OK).json(publicUser);
            } catch (e) {
                next(e);
            }
        };
    },
};
