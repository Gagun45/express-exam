import { Types } from "mongoose";

import { IBase } from "./base.interface";

export interface ICarModel extends IBase {
    name: string;
    slug: string;
    brandId: Types.ObjectId;
}
