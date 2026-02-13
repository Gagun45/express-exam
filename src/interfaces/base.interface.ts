import { Types } from "mongoose";

export interface IBase {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export type PublicEntityType<T, K extends keyof T> = Pick<T, K> & {
    id: string;
};
