import Joi from "joi";

import { validationFields } from "./validation.fields";

export const userValidator = {
    updateAccountType: Joi.object({
        accountType: validationFields.user.accountType.required(),
    }),
};
