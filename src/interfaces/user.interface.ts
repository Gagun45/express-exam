import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";

export interface IUser {
    _id?: string;
    email: string;
    password: string;
    role: UserRolesEnum;
    accountType: UserAccountTypesEnum;
    isBanned: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
