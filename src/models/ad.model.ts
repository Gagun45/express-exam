import { model, Schema } from "mongoose";

import { AdStatusEnum } from "../enums/ad-status.enum";
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

const AdSchema = new Schema<IAd>(
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
        status: {
            type: String,
            enum: Object.values(AdStatusEnum),
            required: true,
            default: AdStatusEnum.PENDING_EDIT,
        },
        editAttempts: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true, versionKey: false },
);

export const Ad = model<IAd>("Ad", AdSchema);
