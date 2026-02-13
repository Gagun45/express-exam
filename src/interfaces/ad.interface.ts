import { Types } from "mongoose";

import { AdStatusEnum } from "../enums/ad-status.enum";
import { CurrencyEnum } from "../enums/currency.enum";
import { IBase, PublicEntityType } from "./base.interface";
import { ICarBrand } from "./car-brand.interface";
import { ICarModel } from "./car-model.interface";
import { ICity } from "./city.interface";
import { IUser } from "./user.interface";

export interface IAd extends IBase {
    description: string;

    carBrand: Types.ObjectId;
    carModel: Types.ObjectId;

    creator: Types.ObjectId;

    city: Types.ObjectId;

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
    "description" | "carBrand" | "carModel" | "city"
> & {
    price: number;
    currency: CurrencyEnum;
};

export type IAdEntityCreateDto = Omit<IAd, keyof IBase>;

export interface IAdPopulated extends Omit<
    IAd,
    "carBrand" | "carModel" | "creator" | "city"
> {
    carBrand: ICarBrand;
    carModel: ICarModel;
    creator: IUser;
    city: ICity;
}

export interface IPublicAd extends PublicEntityType<
    IAd,
    "description" | "price" | "status"
> {
    creator: PublicEntityType<IUser, "email" | "role">;
    carModel: PublicEntityType<ICarModel, "model">;
    carBrand: PublicEntityType<ICarBrand, "brand">;
    city: PublicEntityType<ICity, "city">;
}
