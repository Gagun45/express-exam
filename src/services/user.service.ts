import { QueryFilter } from "mongoose";

import { PermissionsEnum } from "../enums/permissions.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { ApiError } from "../errors/api.error";
import { generalHelper } from "../helpers/general.helper";
import { roleHelper } from "../helpers/role.helper";
import { IUser, IUserCreateDto } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

export const userService = {
    create: (dto: IUserCreateDto): Promise<IUser> => {
        return userRepository.create(dto);
    },
    changeRole: async (
        targetUserId: string,
        currentUser: IUser,
        newRole: UserRolesEnum,
    ) => {
        roleHelper.assertRoleHasPermission(
            currentUser.role,
            PermissionsEnum.CHANGE_ROLE,
        );

        const targetUser = await userService.getById(targetUserId);

        generalHelper.assertUserObjectIdsAreNotEqual(
            currentUser._id,
            targetUser._id,
        );

        roleHelper.assertRoleIsHigherStrictly(currentUser.role, newRole);

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
        currentUser: IUser,
        accountType: UserAccountTypesEnum,
    ): Promise<IUser> => {
        roleHelper.assertRoleHasPermission(
            currentUser.role,
            PermissionsEnum.CHANGE_ACCOUNT_TYPE,
        );

        const targetUser = await userService.getById(targetUserId);

        roleHelper.assertRoleIsHigherOrEqual(currentUser.role, targetUser.role);

        generalHelper.assertUserObjectIdsAreNotEqual(
            currentUser._id,
            targetUser._id,
        );

        roleHelper.assertUserIsNotAdmin(targetUser);

        return await userRepository.updateById(targetUserId, { accountType });
    },
    changeBanStatus: async (
        targetUserId: string,
        currentUser: IUser,
        newBanStatus: boolean,
    ): Promise<IUser> => {
        roleHelper.assertRoleHasPermission(
            currentUser.role,
            PermissionsEnum.CHANGE_BAN_STATUS,
        );
        const targetUser = await userService.getById(targetUserId);

        generalHelper.assertUserObjectIdsAreNotEqual(
            currentUser._id,
            targetUser._id,
        );

        roleHelper.assertRoleIsHigherOrEqual(currentUser.role, targetUser.role);

        roleHelper.assertUserIsNotAdmin(targetUser);

        return await userRepository.updateById(targetUserId, {
            isBanned: newBanStatus,
        });
    },
};
