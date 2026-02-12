import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ICarModelCreateDto } from "../interfaces/car-model.interface";
import { carModelService } from "../services/car-model.service";

export const carModelController = {
    getAllByBrandId: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const brandId = String(req.params["brandId"]);
            const models = await carModelService.getAllByBrandId(brandId);
            res.status(StatusCodesEnum.OK).json(models);
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
            res.status(StatusCodesEnum.CREATED).json(newModel);
        } catch (e) {
            next(e);
        }
    },
};
