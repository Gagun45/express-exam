import { Types } from "mongoose";

import { IBase } from "./base.interface";

export interface IView extends IBase {
    adId: Types.ObjectId;
}
