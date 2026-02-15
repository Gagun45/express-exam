import { Types } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypesEnum } from "../enums/token-types.enum";
import { ApiError } from "../errors/api.error";
import { IAuthCredentials, IAuthResponse } from "../interfaces/auth.interface";
import { ITokenPair } from "../interfaces/token.interface";
import { IUserCreateDto } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

export const authService = {
    signUp: async (dto: IUserCreateDto): Promise<IAuthResponse> => {
        await userService.assertEmailIsUnique(dto.email);
        const password = await passwordService.hash(dto.password);
        const newUser = await userService.create({ ...dto, password });
        const tokens = tokenService.generateTokens({
            userId: newUser._id.toString(),
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
        const user = await userRepository.findOneByParams({ email: dto.email });
        if (!user)
            throw new ApiError(
                "Invalid credentials",
                StatusCodesEnum.UNAUTHORIZED,
            );
        const { _id, password, role, accountType } = user;
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
            userId: _id.toString(),
        });
        await tokenRepository.create({
            ...tokens,
            user: new Types.ObjectId(_id),
        });
        return { tokens, user };
    },
    refresh: async (refreshToken: string): Promise<ITokenPair> => {
        const tokenPayload = tokenService.verifyToken(
            refreshToken,
            TokenTypesEnum.REFRESH,
        );
        const existingToken = await tokenRepository.findOneByParams({
            refreshToken,
        });
        if (!existingToken) {
            throw new ApiError(
                "Refresh token not found",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }
        await tokenRepository.deleteOneByParams({
            refreshToken,
        });

        const tokenPair = tokenService.generateTokens({
            accountType: tokenPayload.accountType,
            role: tokenPayload.role,
            userId: tokenPayload.userId,
        });
        await tokenRepository.create({
            refreshToken: tokenPair.refreshToken,
            user: new Types.ObjectId(tokenPayload.userId),
        });

        return tokenPair;
    },
};
