import { model, Schema } from "mongoose";

import { ICity } from "../interfaces/city.interface";

const citySchema = new Schema<ICity>(
    {
        city: { type: String, required: true, unique: true },
    },
    { versionKey: false },
);

export const City = model<ICity>("City", citySchema);
