import {
    ICarModel,
    ICarModelCreateDto,
} from "../interfaces/car-model.interface";
import { CarModel } from "../models/car-model.model";

export const carModelRepository = {
    create: (dto: ICarModelCreateDto, brandId: string): Promise<ICarModel> => {
        return CarModel.create({ ...dto, brandId });
    },
    getAllByBrandId: (brandId: string): Promise<ICarModel[]> => {
        return CarModel.find({ brandId });
    },
};
