import { Types } from "mongoose";

import { AdStatusEnum } from "../enums/ad-status.enum";
import { CurrencyEnum } from "../enums/currency.enum";
import { IBase } from "./base.interface";

export interface IAd extends IBase {
    description: string;

    carBrand: Types.ObjectId;
    carModel: Types.ObjectId;

    creator: Types.ObjectId;

    price: {
        [CurrencyEnum.UAH]: number;
        [CurrencyEnum.USD]: number;
        [CurrencyEnum.EUR]: number;

        originalCurrency: CurrencyEnum;
        originalPrice: number;
    };
    status: AdStatusEnum;
    editAttempts: number;
}

export type IAdCreateDto = Pick<
    IAd,
    "description" | "carBrand" | "carModel"
> & {
    price: number;
    currency: CurrencyEnum;
};

export type IAdEntityCreateDto = Omit<IAd, keyof IBase>;
