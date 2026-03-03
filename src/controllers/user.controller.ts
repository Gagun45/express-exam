import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { UserBanActionEnum } from "../enums/user-ban-action.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { IUserCreateDto } from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { userService } from "../services/user.service";

const userId = "userId";

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
            const targetUserId = String(req.params[userId]);
            const accountType = req.body.accountType as UserAccountTypesEnum;

            const updatedUser = await userService.changeAccountType(
                targetUserId,
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
            const targetUserId = String(req.params[userId]);
            const newRole = req.body.role as UserRolesEnum;
            const data = await userService.changeRole(targetUserId, newRole);
            const publicUser = userPresenter.toPublicUser(data);
            res.status(StatusCodesEnum.OK).json(publicUser);
        } catch (e) {
            next(e);
        }
    },
    changeBanStatus: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const targetUserId = String(req.params[userId]);
            const action = req.body.action as UserBanActionEnum;
            const newBanStatus =
                action === UserBanActionEnum.BAN ? true : false;
            const data = await userService.changeBanStatus(
                targetUserId,
                newBanStatus,
            );
            const publicUser = userPresenter.toPublicUser(data);
            res.status(StatusCodesEnum.OK).json(publicUser);
        } catch (e) {
            next(e);
        }
    },
    addNewAdmin: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = req.body as IUserCreateDto;
            const newUser = await userService.createAdmin(dto);
            const publicUser = userPresenter.toPublicUser(newUser);
            res.status(StatusCodesEnum.OK).json(publicUser);
        } catch (e) {
            next(e);
        }
    },
};
