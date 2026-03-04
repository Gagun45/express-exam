import { NextFunction, Request, Response } from "express";

import { AdStatusEnum } from "../enums/ad-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import {
    IAdCreateDto,
    IAdQuery,
    IAdUpdateDto,
} from "../interfaces/ad.interface";
import { adPresenter } from "../presenters/ad.presenter";
import { adService } from "../services/ad.service";

const adIdParam = "adId";

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
            const validatedQuery = res.locals.validatedQuery as IAdQuery;
            const { data, meta } = await adService.getAll(validatedQuery);
            const publicAds = adPresenter.toPublicAds(data);
            res.status(StatusCodesEnum.OK).json({ data: publicAds, meta });
        } catch (e) {
            next(e);
        }
    },
    getMy: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentUser = res.locals.currentUser;
            const validatedQuery = res.locals.validatedQuery as IAdQuery;

            const { data, meta } = await adService.getMy(
                currentUser,
                validatedQuery,
            );
            const publicAds = adPresenter.toPublicAds(data);
            res.status(StatusCodesEnum.OK).json({ data: publicAds, meta });
        } catch (e) {
            next(e);
        }
    },
    deleteOwnAd: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentUser = res.locals.currentUser;
            const adId = String(req.params[adIdParam]);
            await adService.deleteOwnAd(adId, currentUser);
            res.sendStatus(StatusCodesEnum.NO_CONTENT);
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
            const adId = String(req.params[adIdParam]);
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
    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = req.body as IAdUpdateDto;
            const adId = String(req.params[adIdParam]);
            const currentUser = res.locals.currentUser;
            const ad = await adService.update(adId, dto, currentUser);
            const publicAd = adPresenter.toPublicAd(ad);
            res.status(StatusCodesEnum.OK).json(publicAd);
        } catch (e) {
            next(e);
        }
    },
    updateStatus: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const status = req.body.status as AdStatusEnum;
            const adId = String(req.params[adIdParam]);
            const ad = await adService.updateStatus(adId, status);
            const publicAd = adPresenter.toPublicAd(ad);
            res.status(StatusCodesEnum.OK).json(publicAd);
        } catch (e) {
            next(e);
        }
    },
    viewPublicAd: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const adId = String(req.params[adIdParam]);
            const ad = await adService.viewPublicAd(adId);
            const publicAd = adPresenter.toPublicAd(ad);
            res.status(StatusCodesEnum.OK).json(publicAd);
        } catch (e) {
            next(e);
        }
    },
    getAdStats: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const adId = String(req.params[adIdParam]);
            const { currentUser } = res.locals;
            const data = await adService.getAdStats(adId, currentUser);
            const publicAd = adPresenter.toPublicAd(data.ad);
            res.status(StatusCodesEnum.OK).json({ ...data, ad: publicAd });
        } catch (e) {
            next(e);
        }
    },
};
