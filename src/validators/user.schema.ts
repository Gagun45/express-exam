import Joi from "joi";

import { UserBanActionEnum } from "../enums/user-ban-action.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { validationFields } from "./validation.fields";

export const userValidator = {
    changeAccountType: Joi.object({
        accountType: validationFields.user.accountType.required(),
    }),
    changeRole: Joi.object({
        role: Joi.string()
            .valid(...Object.values(UserRolesEnum))
            .required(),
    }),
    changeBanStatus: Joi.object({
        action: Joi.string()
            .valid(...Object.values(UserBanActionEnum))
            .required(),
    }),
};
