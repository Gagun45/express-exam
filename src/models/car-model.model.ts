import { model, Schema, Types } from "mongoose";

import { ICarModel } from "../interfaces/car-model.interface";

const CarModelSchema = new Schema<ICarModel>(
    {
        model: { type: String, required: true },
        brand: { type: Types.ObjectId, ref: "CarBrand", required: true },
    },
    {
        versionKey: false,
    },
);

export const CarModel = model<ICarModel>("CarModel", CarModelSchema);
