import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ICarBrandCreateDto } from "../interfaces/car-brand.interface";
import { carBrandPresenter } from "../presenters/car-brand.presenter";
import { carBrandService } from "../services/car-brand.service";

export const carBrandController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const brands = await carBrandService.getAll();
            const publicBrands = carBrandPresenter.toPublicCarBrands(brands);
            res.status(StatusCodesEnum.OK).json(publicBrands);
        } catch (e) {
            next(e);
        }
    },
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = req.body as ICarBrandCreateDto;
            const currentUser = res.locals.currentUser;
            const newBrand = await carBrandService.create(dto, currentUser);
            const publicBrand = carBrandPresenter.toPublicCarBrand(newBrand);
            res.status(StatusCodesEnum.CREATED).json(publicBrand);
        } catch (e) {
            next(e);
        }
    },
};
