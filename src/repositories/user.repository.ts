import { QueryFilter } from "mongoose";

import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { IUser, IUserCreateDto } from "../interfaces/user.interface";
import { User } from "../models/user.model";

export const userRepository = {
    create: (dto: IUserCreateDto): Promise<IUser> => User.create(dto),
    getAll: (): Promise<IUser[]> => User.find(),

    findOneByParams: (params: QueryFilter<IUser>): Promise<IUser> =>
        User.findOne(params),

    findById: (userId: string): Promise<IUser | null> => User.findById(userId),

    updateAccountType: (
        userId: string,
        accountType: UserAccountTypesEnum,
    ): Promise<IUser | null> =>
        User.findByIdAndUpdate(
            userId,
            { accountType },
            { returnDocument: "after" },
        ),
    updateRole: (userId: string, role: UserRolesEnum): Promise<IUser | null> =>
        User.findByIdAndUpdate(userId, { role }, { returnDocument: "after" }),
};
