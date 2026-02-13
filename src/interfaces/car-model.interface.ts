import { Types } from "mongoose";

import { PublicEntityType } from "./base.interface";

export interface ICarModel {
    _id: Types.ObjectId;
    model: string;
    brand: Types.ObjectId;
}

export type ICarModelCreateDto = Pick<ICarModel, "model">;

export type IPubicCarModel = PublicEntityType<ICarModel, "model">;
