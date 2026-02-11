import { Types } from "mongoose";

import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { IBase } from "./base.interface";

export interface IToken extends IBase {
    _id: string;
    user: Types.ObjectId;
    refreshToken: string;
}

export type ITokenCreateDto = Pick<IToken, "user" | "refreshToken">;

export interface ITokenPayload {
    userId: string;
    role: UserRolesEnum;
    accountType: UserAccountTypesEnum;
}

export type ITokenPair = {
    accessToken: string;
    refreshToken: string;
};
