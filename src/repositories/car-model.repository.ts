import { QueryFilter } from "mongoose";

import {
    ICarModel,
    ICarModelCreateDto,
} from "../interfaces/car-model.interface";
import { CarModel } from "../models/car-model.model";

export const carModelRepository = {
    create: (dto: ICarModelCreateDto, brandId: string): Promise<ICarModel> =>
        CarModel.create({ ...dto, brand: brandId }),
    getAllByBrandId: (brandId: string): Promise<ICarModel[]> =>
        CarModel.find({ brand: brandId }),
    findById: (modelId: string): Promise<ICarModel | null> =>
        CarModel.findById(modelId),
    findOneByParams: (
        params: QueryFilter<ICarModel>,
    ): Promise<ICarModel | null> => CarModel.findOne(params),
};
