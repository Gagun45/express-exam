import Joi from "joi";

import { validationFields } from "./validation.fields";

export const cityValidator = {
    create: Joi.object({
        city: validationFields.city.city.required(),
    }),
};
