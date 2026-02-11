import { Types } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IAuthCredentials, IAuthResponse } from "../interfaces/auth.interface";
import { IUserCreateDto } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

export const authService = {
    signUp: async (dto: IUserCreateDto): Promise<IAuthResponse> => {
        await userService.assertEmailIsUnique(dto.email);
        const password = await passwordService.hash(dto.password);
        const newUser = await userService.create({ ...dto, password });
        const tokens = tokenService.generateTokens({
            userId: newUser._id,
            role: newUser.role,
            accountType: newUser.accountType,
        });
        await tokenRepository.create({
            ...tokens,
            user: new Types.ObjectId(newUser._id),
        });
        return { tokens, user: newUser };
    },
    signIn: async (dto: IAuthCredentials): Promise<IAuthResponse> => {
        const user = await userService.findOneByParams({ email: dto.email });
        if (!user)
            throw new ApiError(
                "Invalid credentials",
                StatusCodesEnum.UNAUTHORIZED,
            );
        const { _id: userId, password, role, accountType } = user;
        const isPasswordCorrect = await passwordService.compare(
            dto.password,
            password,
        );
        if (!isPasswordCorrect)
            throw new ApiError(
                "Invalid credentials",
                StatusCodesEnum.UNAUTHORIZED,
            );
        const tokens = tokenService.generateTokens({
            accountType,
            role,
            userId,
        });
        await tokenRepository.create({
            ...tokens,
            user: new Types.ObjectId(userId),
        });
        return { tokens, user };
    },
};
