import Joi from "joi";

import { validationFields } from "./validation.fields";

export const carValidator = {
    createBrand: Joi.object({
        brand: validationFields.car.brand.required(),
    }),
    createModel: Joi.object({
        model: validationFields.car.model.required(),
    }),
};
