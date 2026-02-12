import Joi from "joi";

import { Regex } from "../constants/regex.constants";
import { UserAccountTypesEnum } from "../enums/user-account-types.enum";

export const validationFields = {
    user: {
        email: Joi.string().email().trim(),
        password: Joi.string().regex(Regex.PASSWORD),
        accountType: Joi.string().valid(...Object.values(UserAccountTypesEnum)),
    },
};
