import { model, Schema } from "mongoose";

import { CurrencyEnum } from "../enums/currency.enum";
import { IAd } from "../interfaces/ad.interface";

const PriceSchema = new Schema(
    {
        [CurrencyEnum.UAH]: { type: Number, required: true },
        [CurrencyEnum.USD]: { type: Number, required: true },
        [CurrencyEnum.EUR]: { type: Number, required: true },

        originalCurrency: {
            type: String,
            enum: Object.values(CurrencyEnum),
            required: true,
        },
        originalPrice: { type: Number, required: true },
    },
    { _id: false },
);

const AdSchema = new Schema(
    {
        description: { type: String, required: true },

        carBrand: {
            type: Schema.Types.ObjectId,
            ref: "CarBrand",
            required: true,
        },

        carModel: {
            type: Schema.Types.ObjectId,
            ref: "CarModel",
            required: true,
        },

        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        price: { type: PriceSchema, required: true },
    },
    { timestamps: true, versionKey: false },
);

export const Ad = model<IAd>("Ad", AdSchema);
