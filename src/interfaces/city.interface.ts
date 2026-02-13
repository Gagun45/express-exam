import { Types } from "mongoose";

import { PublicEntityType } from "./base.interface";

export interface ICity {
    _id: Types.ObjectId;
    city: string;
}

export type ICityCreateDto = Pick<ICity, "city">;

export type IPublicCity = PublicEntityType<ICity, "city">;
