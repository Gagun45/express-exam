import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IAdCreateDto } from "../interfaces/ad.interface";
import { adPresenter } from "../presenters/ad.presenter";
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
            const publicAds = adPresenter.toPublicAds(ads);
            res.status(StatusCodesEnum.OK).json(publicAds);
        } catch (e) {
            next(e);
        }
    },
    getMy: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentUser = res.locals.currentUser;
            const ads = await adService.getMy(currentUser);
            const publicAds = adPresenter.toPublicAds(ads);
            res.status(StatusCodesEnum.OK).json(publicAds);
        } catch (e) {
            next(e);
        }
    },
    editDescription: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const description = req.body.description as string;
            const adId = String(req.params["adId"]);
            const currentUser = res.locals.currentUser;
            const updatedAd = await adService.editDescription(
                adId,
                description,
                currentUser,
            );
            res.status(StatusCodesEnum.OK).json(updatedAd);
        } catch (e) {
            next(e);
        }
    },
};
