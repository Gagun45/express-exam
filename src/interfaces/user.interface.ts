import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { IBase, PublicEntityType } from "./base.interface";

export interface IUser extends IBase {
    name: string;
    email: string;
    password: string;
    role: UserRolesEnum;
    accountType: UserAccountTypesEnum;
    isBanned: boolean;
}

export type IUserCreateDto = Pick<IUser, "email" | "password" | "name">;
export type IUserEntityCreateDto = IUserCreateDto &
    Partial<Pick<IUser, "role" | "accountType">>;

export type IPublicUser = PublicEntityType<
    IUser,
    "accountType" | "email" | "role" | "isBanned" | "name"
>;
