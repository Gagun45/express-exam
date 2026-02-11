import { QueryFilter } from "mongoose";

import { IUser, IUserCreateDto } from "../interfaces/user.interface";
import { User } from "../models/user.model";

export const userRepository = {
    create: (dto: IUserCreateDto): Promise<IUser> => {
        return User.create(dto);
    },
    findOneByParams: (params: QueryFilter<IUser>): Promise<IUser> => {
        return User.findOne(params);
    },
};
