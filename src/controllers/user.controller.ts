import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { userPresenter } from "../presenters/user.presenter";
import { userService } from "../services/user.service";

export const userController = {
    updateAccountType: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const userId = res.locals.userId;
            const accountType = req.body.accountType as UserAccountTypesEnum;
            const targetUserId = res.locals.targetUserId;

            const updatedUser = await userService.changeAccountType(
                targetUserId,
                userId,
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
    upgradeToManager: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const userId = res.locals.userId;
            const targetUserId = res.locals.targetUserId;
            const user = await userService.upgradeToManager(
                targetUserId,
                userId,
            );
            const publicUser = userPresenter.toPublicUser(user);
            res.status(StatusCodesEnum.OK).json(publicUser);
        } catch (e) {
            next(e);
        }
    },
    downgradeFromManager: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const userId = res.locals.userId;
            const targetUserId = res.locals.targetUserId;
            const user = await userService.downgradeFromManager(
                targetUserId,
                userId,
            );
            const publicUser = userPresenter.toPublicUser(user);
            res.status(StatusCodesEnum.OK).json(publicUser);
        } catch (e) {
            next(e);
        }
    },
    changeRole: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.userId;
            const targetUserId = res.locals.targetUserId;
            const role = req.body.role as UserRolesEnum;
            const user = await userService.changeBasicRoles(
                targetUserId,
                userId,
                role,
            );
            const publicUser = userPresenter.toPublicUser(user);
            res.status(StatusCodesEnum.OK).json(publicUser);
        } catch (e) {
            next(e);
        }
    },
};
