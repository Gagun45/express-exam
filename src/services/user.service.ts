import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IUser, IUserCreateDto } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

export const userService = {
    create: (dto: IUserCreateDto): Promise<IUser> => {
        return userRepository.create(dto);
    },
    assertEmailIsUnique: async (email: string): Promise<void> => {
        const user = await userRepository.findOneByParams({ email });
        if (user)
            throw new ApiError(
                "Email already taken",
                StatusCodesEnum.BAD_REQUEST,
            );
    },
};
