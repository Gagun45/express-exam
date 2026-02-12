import { Types } from "mongoose";

export interface ICarModel {
    _id: Types.ObjectId;
    model: string;
    brandId: Types.ObjectId;
}

export type ICarModelCreateDto = Pick<ICarModel, "model">;
