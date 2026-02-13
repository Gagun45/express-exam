import Joi from "joi";

import { Regex } from "../constants/regex.constants";
import { CurrencyEnum } from "../enums/currency.enum";
import { ReportTypeEnum } from "../enums/report-type.enum";
import { UserAccountTypesEnum } from "../enums/user-account-types.enum";

const JoiObjectId = Joi.string().hex().length(24);

export const validationFields = {
    user: {
        email: Joi.string().email().trim(),
        password: Joi.string().regex(Regex.PASSWORD),
        accountType: Joi.string().valid(...Object.values(UserAccountTypesEnum)),
    },
    car: {
        brand: Joi.string().min(3).max(50).trim(),
        model: Joi.string().min(3).max(50).trim(),
    },
    ad: {
        description: Joi.string().min(3).max(255).trim(),
        carBrand: JoiObjectId,
        carModel: JoiObjectId,
        price: Joi.number().min(1).max(999999999).strict(),
        currency: Joi.string()
            .valid(...Object.values(CurrencyEnum))
            .required(),
    },
    report: {
        type: Joi.string().valid(...Object.values(ReportTypeEnum)),
        name: Joi.string().trim(),
        relatedBrandId: JoiObjectId.required(),
    },
    city: {
        city: Joi.string().max(255).trim(),
    },
};
