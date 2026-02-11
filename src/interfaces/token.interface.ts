import { Types } from "mongoose";

import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";

export interface IToken {
    _id: string;
    user: Types.ObjectId;
    refreshToken: string;
    accessToken: string;
}

export type ITokenCreateDto = Pick<
    IToken,
    "user" | "accessToken" | "refreshToken"
>;

export interface ITokenPayload {
    userId: string;
    role: UserRolesEnum;
    accountType: UserAccountTypesEnum;
}

export type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;
