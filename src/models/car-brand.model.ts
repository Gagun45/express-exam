import { model, Schema } from "mongoose";

import { ICarBrand } from "../interfaces/car-brand.interface";

const CarBrandSchema = new Schema<ICarBrand>(
    {
        brand: { type: String, required: true, unique: true },
    },
    { versionKey: false },
);

export const CarBrand = model<ICarBrand>("CarBrand", CarBrandSchema);
