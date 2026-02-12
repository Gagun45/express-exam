import Joi from "joi";

import { BasicRoles } from "../enums/user-roles.enum";
import { validationFields } from "./validation.fields";

export const userValidator = {
    changeAccountType: Joi.object({
        accountType: validationFields.user.accountType.required(),
    }),
    changeRole: Joi.object({
        role: Joi.string()
            .valid(...Object.values(BasicRoles))
            .required(),
    }),
};
