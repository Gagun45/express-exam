import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IAuthCredentials } from "../interfaces/auth.interface";
import { IUser, IUserCreateDto } from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";

export const authController = {
    signUp: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = req.body as IUserCreateDto;
            const data = await authService.signUp(dto);
            const publicUser = userPresenter.toPublicUser(data.user);
            res.status(StatusCodesEnum.CREATED).json({
                ...data,
                user: publicUser,
            });
        } catch (e) {
            next(e);
        }
    },
    signIn: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = req.body as IAuthCredentials;
            const data = await authService.signIn(dto);
            const publicUser = userPresenter.toPublicUser(data.user);
            res.status(StatusCodesEnum.OK).json({
                ...data,
                user: publicUser,
            });
        } catch (e) {
            next(e);
        }
    },
    me: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = res.locals.user as IUser;
            const data = await userService.getById(user._id);
            const publicUser = userPresenter.toPublicUser(data);
            res.status(StatusCodesEnum.OK).json(publicUser);
        } catch (e) {
            next(e);
        }
    },
};
