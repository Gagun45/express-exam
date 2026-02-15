import Joi from "joi";

import { validationFields } from "./validation.fields";

export const authValidator = {
    signUp: Joi.object({
        email: validationFields.user.email.required(),
        password: validationFields.user.password.required(),
        name: validationFields.user.name.required(),
    }),
    signIn: Joi.object({
        email: validationFields.user.email.required(),
        password: validationFields.user.password.required(),
    }),
    refreshToken: Joi.object({
        refreshToken: validationFields.tokens.token.required(),
    }),
};
