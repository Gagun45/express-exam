import { QueryFilter } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { ApiError } from "../errors/api.error";
import { IUser, IUserCreateDto } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

export const userService = {
    create: (dto: IUserCreateDto): Promise<IUser> => {
        return userRepository.create(dto);
    },
    createAdmin: async (dto: IUserCreateDto): Promise<IUser> => {
        await userService.assertEmailIsUnique(dto.email);

        return await userRepository.create({
            ...dto,
            accountType: UserAccountTypesEnum.PREMIUM,
            role: UserRolesEnum.ADMIN,
        });
    },
    changeRole: async (targetUserId: string, newRole: UserRolesEnum) => {
        if (newRole === UserRolesEnum.ADMIN) {
            throw new ApiError(
                "Cannot assign admin role",
                StatusCodesEnum.FORBIDDEN,
            );
        }
        return await userRepository.updateById(targetUserId, { role: newRole });
    },
    getAll: (): Promise<IUser[]> => {
        return userRepository.getAll();
    },
    assertEmailIsUnique: async (email: string): Promise<void> => {
        const user = await userRepository.findOneByParams({ email });
        if (user)
            throw new ApiError("Email already taken", StatusCodesEnum.CONFLICT);
    },
    getOneByParams: async (params: QueryFilter<IUser>): Promise<IUser> => {
        const user = await userRepository.findOneByParams(params);
        if (!user)
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        return user;
    },
    getById: async (userId: string): Promise<IUser> => {
        const user = await userRepository.findById(userId);
        if (!user)
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        return user;
    },
    changeAccountType: async (
        targetUserId: string,
        accountType: UserAccountTypesEnum,
    ): Promise<IUser> => {
        return await userRepository.updateById(targetUserId, { accountType });
    },
    changeBanStatus: async (
        targetUserId: string,
        newBanStatus: boolean,
    ): Promise<IUser> => {
        return await userRepository.updateById(targetUserId, {
            isBanned: newBanStatus,
        });
    },
};
