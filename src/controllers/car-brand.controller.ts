import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ICarBrandCreateDto } from "../interfaces/car-brand.interface";
import { IUser } from "../interfaces/user.interface";
import { carBrandService } from "../services/car-brand.service";

export const carBrandController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const brands = await carBrandService.getAll();
            res.status(StatusCodesEnum.OK).json(brands);
        } catch (e) {
            next(e);
        }
    },
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = req.body as ICarBrandCreateDto;
            const currentUser = res.locals.currentUser as IUser;
            const newBrand = await carBrandService.create(
                dto,
                currentUser.role,
            );
            res.status(StatusCodesEnum.OK).json(newBrand);
        } catch (e) {
            next(e);
        }
    },
};
