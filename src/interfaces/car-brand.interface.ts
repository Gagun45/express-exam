import { Types } from "mongoose";

export interface ICarBrand {
    _id: Types.ObjectId;
    brand: string;
}

export type ICarBrandCreateDto = Pick<ICarBrand, "brand">;
