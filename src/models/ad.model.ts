import { model, Schema } from "mongoose";

import { AdStatusEnum } from "../enums/ad-status.enum";
import { CurrencyEnum } from "../enums/currency.enum";
import { IAd } from "../interfaces/ad.interface";

const AdSchema = new Schema<IAd>(
    {
        city: {
            type: Schema.Types.ObjectId,
            ref: "City",
            required: true,
        },
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

        currency: {
            type: String,
            enum: Object.values(CurrencyEnum),
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(AdStatusEnum),
            default: AdStatusEnum.ACTIVE,
            required: true,
        },
        editAttempts: {
            type: Number,
            default: 0,
        },
        views: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true, versionKey: false },
);

export const Ad = model<IAd>("Ad", AdSchema);
