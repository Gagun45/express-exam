import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ICityCreateDto } from "../interfaces/city.interface";
import { cityPresenter } from "../presenters/city.presenter";
import { cityService } from "../services/city.service";

export const cityController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cities = await cityService.getAll();
            const publicCities = cityPresenter.toPublicCities(cities);
            res.status(StatusCodesEnum.OK).json(publicCities);
        } catch (e) {
            next(e);
        }
    },
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = req.body as ICityCreateDto;
            const { currentUser } = res.locals;
            const city = await cityService.create(dto, currentUser);
            const publicCity = cityPresenter.toPublicCity(city);
            res.status(StatusCodesEnum.CREATED).json(publicCity);
        } catch (e) {
            next(e);
        }
    },
};
