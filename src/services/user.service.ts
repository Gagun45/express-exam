import { QueryFilter } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { BasicRoles, UserRolesEnum } from "../enums/user-roles.enum";
import { ApiError } from "../errors/api.error";
import { preventAdminModification } from "../helpers/admin.helper";
import { IUser, IUserCreateDto } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

export const userService = {
    create: (dto: IUserCreateDto): Promise<IUser> => {
        return userRepository.create(dto);
    },
    getAll: (): Promise<IUser[]> => {
        return userRepository.getAll();
    },
    updateUserRole: async (
        targetUserId: string,
        userId: string,
        role: UserRolesEnum,
    ): Promise<IUser> => {
        if (targetUserId === userId) {
            throw new ApiError(
                "Forbidden to modify your own role",
                StatusCodesEnum.FORBIDDEN,
            );
        }
        const targetUser = await userService.getById(targetUserId);
        preventAdminModification(targetUser);
        return await userRepository.updateById(targetUserId, { role });
    },
    assertEmailIsUnique: async (email: string): Promise<void> => {
        const user = await userRepository.findOneByParams({ email });
        if (user)
            throw new ApiError(
                "Email already taken",
                StatusCodesEnum.BAD_REQUEST,
            );
    },
    getOneByParams: async (params: QueryFilter<IUser>): Promise<IUser> => {
        const user = await userRepository.findOneByParams(params);
        if (!user)
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        return user;
    },
    findOneByParams: async (
        params: QueryFilter<IUser>,
    ): Promise<IUser | null> => {
        return await userRepository.findOneByParams(params);
    },
    getById: async (userId: string): Promise<IUser> => {
        const user = await userRepository.findById(userId);
        if (!user)
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        return user;
    },
    changeAccountType: async (
        targetUserId: string,
        userId: string,
        accountType: UserAccountTypesEnum,
    ): Promise<IUser> => {
        if (userId === targetUserId) {
            throw new ApiError(
                "Cannot modify your own account type",
                StatusCodesEnum.FORBIDDEN,
            );
        }
        const targetUser = await userService.getById(targetUserId);
        preventAdminModification(targetUser);
        return await userRepository.updateById(targetUserId, { accountType });
    },
    upgradeToManager: (targetUserId: string, userId: string): Promise<IUser> =>
        userService.updateUserRole(targetUserId, userId, UserRolesEnum.MANAGER),
    downgradeFromManager: (
        targetUserId: string,
        userId: string,
    ): Promise<IUser> =>
        userService.updateUserRole(targetUserId, userId, UserRolesEnum.BUYER),
    changeBasicRoles: (
        targetUserId: string,
        userId: string,
        role: UserRolesEnum,
    ): Promise<IUser> => {
        if (!BasicRoles.includes(role))
            throw new ApiError(
                "Invalid role type",
                StatusCodesEnum.BAD_REQUEST,
            );
        return userService.updateUserRole(targetUserId, userId, role);
    },
};
