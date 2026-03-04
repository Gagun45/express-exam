import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { UserBanActionEnum } from "../enums/user-ban-action.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { IUserCreateDto } from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { userService } from "../services/user.service";

const userIdParam = "userId";

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
    uploadAvatar: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.currentUserId as string;
            const avatar = req.files.avatar as UploadedFile;
            const updatedUser = await userService.uploadAvatar(userId, avatar);
            const publicUser = userPresenter.toPublicUser(updatedUser);
            res.status(StatusCodesEnum.OK).json(publicUser);
        } catch (e) {
            next(e);
        }
    },
    resetAvatar: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.currentUserId as string;
            const updatedUser = await userService.deleteAvatar(userId);
            const publicUser = userPresenter.toPublicUser(updatedUser);
            res.status(StatusCodesEnum.OK).json(publicUser);
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
            const targetUserId = String(req.params[userIdParam]);
            const accountType = req.body.accountType as UserAccountTypesEnum;

            const updatedUser = await userService.changeAccountType(
                targetUserId,
                accountType,
            );
            const publicUser = userPresenter.toPublicUser(updatedUser);
            res.status(StatusCodesEnum.OK).json(publicUser);
        } catch (e) {
            next(e);
        }
    },
    changeRole: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const targetUserId = String(req.params[userIdParam]);
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
            const targetUserId = String(req.params[userIdParam]);
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
