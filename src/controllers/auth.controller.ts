import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IAuthCredentials } from "../interfaces/auth.interface";
import { IUserCreateDto } from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { authService } from "../services/auth.service";
import { tokenService } from "../services/token.service";

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
    logout: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const refreshToken = req.body.refreshToken as string;
            await tokenService.deleteOneByParams({ refreshToken });
            res.status(StatusCodesEnum.NO_CONTENT).json();
        } catch (e) {
            next(e);
        }
    },
    me: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentUser = res.locals.currentUser;
            const publicUser = userPresenter.toPublicUser(currentUser);
            res.status(StatusCodesEnum.OK).json(publicUser);
        } catch (e) {
            next(e);
        }
    },
};
