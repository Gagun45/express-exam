import { QueryFilter } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { ApiError } from "../errors/api.error";
import { IUser, IUserCreateDto } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

export const userService = {
    create: (dto: IUserCreateDto): Promise<IUser> => {
        return userRepository.create(dto);
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
    updateAccountType: (
        userId: string,
        accountType: UserAccountTypesEnum,
    ): Promise<IUser> => {
        const updatedUser = userRepository.updateAccountType(
            userId,
            accountType,
        );
        if (!updatedUser) throw new ApiError("User not found", 400);
        return updatedUser;
    },
};
