import Joi from "joi";

import { validationFields } from "./validation.fields";

export const carBrandValidator = {
    create: Joi.object({
        brand: validationFields.carBrand.brand.required(),
    }),
};
