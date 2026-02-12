import Joi from "joi";

import { validationFields } from "./validation.fields";

export const authValidator = {
    signUp: Joi.object({
        email: validationFields.user.email.required(),
        password: validationFields.user.password.required(),
    }),
    signIn: Joi.object({
        email: validationFields.user.email.required(),
        password: validationFields.user.password.required(),
    }),
};
