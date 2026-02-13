import { Types } from "mongoose";

import { PublicEntityType } from "./base.interface";

export interface ICarBrand {
    _id: Types.ObjectId;
    brand: string;
}

export type ICarBrandCreateDto = Pick<ICarBrand, "brand">;

export type IPubicCarBrand = PublicEntityType<ICarBrand, "brand">;
