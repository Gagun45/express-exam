import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ICarModelCreateDto } from "../interfaces/car-model.interface";
import { carBrandPresenter } from "../presenters/car-brand.presenter";
import { carModelPresenter } from "../presenters/car-model.presenter";
import { carModelService } from "../services/car-model.service";

export const carModelController = {
    getAllByBrandId: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const brandId = String(req.params["brandId"]);
            const data = await carModelService.getAllByBrandId(brandId);
            const publicModels = carModelPresenter.toPublicCarModels(
                data.models,
            );
            const publicBrand = carBrandPresenter.toPublicCarBrand(data.brand);
            res.status(StatusCodesEnum.OK).json({
                brand: publicBrand,
                models: publicModels,
            });
        } catch (e) {
            next(e);
        }
    },
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = req.body as ICarModelCreateDto;
            const brandId = String(req.params["brandId"]);
            const currentUser = res.locals.currentUser;
            const newModel = await carModelService.create(
                dto,
                brandId,
                currentUser,
            );
            const publicModel = carModelPresenter.toPublicCarModel(newModel);
            res.status(StatusCodesEnum.CREATED).json(publicModel);
        } catch (e) {
            next(e);
        }
    },
};
