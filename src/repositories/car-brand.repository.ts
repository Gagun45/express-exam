import { QueryFilter } from "mongoose";

import {
    ICarBrand,
    ICarBrandCreateDto,
} from "../interfaces/car-brand.interface";
import { CarBrand } from "../models/car-brand.model";

export const carBrandRepository = {
    create: (dto: ICarBrandCreateDto): Promise<ICarBrand> => {
        return CarBrand.create(dto);
    },
    getAll: (): Promise<ICarBrand[]> => {
        return CarBrand.find();
    },
    findOneByParams: (
        params: QueryFilter<ICarBrand>,
    ): Promise<ICarBrand | null> => {
        return CarBrand.findOne(params);
    },
    findById: (brandId: string): Promise<ICarBrand | null> => {
        return CarBrand.findById(brandId);
    },
};
