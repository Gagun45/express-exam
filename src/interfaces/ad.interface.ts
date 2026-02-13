import { Types } from "mongoose";

import { AdStatusEnum } from "../enums/ad-status.enum";
import { CurrencyEnum } from "../enums/currency.enum";
import { IBase, PublicEntityType } from "./base.interface";
import { ICarBrand } from "./car-brand.interface";
import { ICarModel } from "./car-model.interface";
import { IUser } from "./user.interface";

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

export interface IAdPopulated extends Omit<
    IAd,
    "carBrand" | "carModel" | "creator"
> {
    carBrand: ICarBrand;
    carModel: ICarModel;
    creator: IUser;
}

export interface IPublicAd extends PublicEntityType<
    IAd,
    "description" | "price" | "status"
> {
    creator: PublicEntityType<IUser, "email" | "role">;
    carModel: PublicEntityType<ICarModel, "model">;
    carBrand: PublicEntityType<ICarBrand, "brand">;
}
