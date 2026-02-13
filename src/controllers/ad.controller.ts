import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IAdCreateDto } from "../interfaces/ad.interface";
import { adService } from "../services/ad.service";

export const adController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = req.body as IAdCreateDto;
            const currentUser = res.locals.currentUser;
            const newAd = await adService.create(dto, currentUser);
            res.status(StatusCodesEnum.CREATED).json(newAd);
        } catch (e) {
            next(e);
        }
    },
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ads = await adService.getAll();
            res.status(StatusCodesEnum.OK).json(ads);
        } catch (e) {
            next(e);
        }
    },
    getMy: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentUser = res.locals.currentUser;
            const ads = await adService.getMy(currentUser);
            res.status(StatusCodesEnum.OK).json(ads);
        } catch (e) {
            next(e);
        }
    },
};
