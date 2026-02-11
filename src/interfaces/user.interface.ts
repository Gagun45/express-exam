import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { IBase } from "../models/base.model";

export interface IUser extends IBase {
    _id: string;
    email: string;
    password: string;
    role: UserRolesEnum;
    accountType: UserAccountTypesEnum;
    isBanned: boolean;
}

export type IUserCreateDto = Pick<IUser, "email" | "password">;

export type IPublicUser = Pick<
    IUser,
    "accountType" | "email" | "role" | "isBanned"
> & { id: string };
