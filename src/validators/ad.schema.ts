import Joi from "joi";

import { validationFields } from "./validation.fields";

export const adValidator = {
    create: Joi.object({
        description: validationFields.ad.description.required(),
        carBrand: validationFields.ad.carBrand.required(),
        carModel: validationFields.ad.carModel.required(),
        price: validationFields.ad.price.required(),
        currency: validationFields.ad.currency.required(),
        city: validationFields.ad.city.required(),
    }),
    editDescription: Joi.object({
        description: validationFields.ad.description.required(),
    }),
    query: Joi.object({
        page: validationFields.query.page,
        limit: validationFields.query.limit,
    }),
    update: Joi.object({
        carBrand: validationFields.ad.carBrand,
        carModel: validationFields.ad.carModel,
        price: validationFields.ad.price,
        currency: validationFields.ad.currency,
        city: validationFields.ad.city,
    })
        .min(1)
        .message("Provide at least one proper field"),
    updateStatus: Joi.object({
        status: validationFields.ad.status.required(),
    }),
};
