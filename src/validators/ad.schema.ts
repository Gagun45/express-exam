import Joi from "joi";

import { validationFields } from "./validation.fields";

export const adValidator = {
    create: Joi.object({
        description: validationFields.ad.description.required(),
        carBrand: validationFields.ad.carBrand.required(),
        carModel: validationFields.ad.carModel.required(),
        price: validationFields.ad.price.required(),
        currency: validationFields.ad.currency.required(),
    }),
    editDescription: Joi.object({
        description: validationFields.ad.description.required(),
    }),
};
