import { Types } from "mongoose";

import { ITokenPair } from "../interfaces/token.interface";
import { IUser, IUserCreateDto } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

export const authService = {
    signUp: async (
        dto: IUserCreateDto,
    ): Promise<{ user: IUser; tokens: ITokenPair }> => {
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
};
