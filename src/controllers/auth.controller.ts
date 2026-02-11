import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IUserCreateDto } from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { authService } from "../services/auth.service";

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
};
