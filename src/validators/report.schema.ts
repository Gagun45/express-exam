import Joi from "joi";

import { validationFields } from "./validation.fields";

export const reportVadidator = {
    brand: Joi.object({
        name: validationFields.report.name.required(),
    }),
    model: Joi.object({
        name: validationFields.report.name.required(),
        relatedBrandId: validationFields.report.relatedBrandId.required(),
    }),
};
