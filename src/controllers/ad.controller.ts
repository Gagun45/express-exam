import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IAdCreateDto } from "../interfaces/ad.interface";
import { adPresenter } from "../presenters/ad.presenter";
import { adService } from "../services/ad.service";

export const adController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = req.body as IAdCreateDto;
            const { currentUser } = res.locals;
            const populatedNewAd = await adService.create(dto, currentUser);
            const publicAd = adPresenter.toPublicAd(populatedNewAd);
            res.status(StatusCodesEnum.CREATED).json(publicAd);
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
            const ad = await adService.editDescription(
                adId,
                description,
                currentUser,
            );
            const publicAd = adPresenter.toPublicAd(ad);
            res.status(StatusCodesEnum.OK).json(publicAd);
        } catch (e) {
            next(e);
        }
    },
    viewPublicAd: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const adId = String(req.params["adId"]);
            const ad = await adService.viewPublicAd(adId);
            const publicAd = adPresenter.toPublicAd(ad);
            res.status(StatusCodesEnum.OK).json(publicAd);
        } catch (e) {
            next(e);
        }
    },
    getAdStats: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const adId = String(req.params["adId"]);
            const { currentUser } = res.locals;
            const data = await adService.getAdStats(adId, currentUser);
            const publicAd = adPresenter.toPublicAd(data.ad);
            res.status(StatusCodesEnum.OK).json({ ...data, ad: publicAd });
        } catch (e) {
            next(e);
        }
    },
};
