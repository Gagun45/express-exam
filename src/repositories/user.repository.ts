import { QueryFilter, UpdateQuery } from "mongoose";

import { IUser, IUserEntityCreateDto } from "../interfaces/user.interface";
import { User } from "../models/user.model";

export const userRepository = {
    create: (dto: IUserEntityCreateDto): Promise<IUser> => User.create(dto),
    getAll: (): Promise<IUser[]> => User.find(),

    findOneByParams: (params: QueryFilter<IUser>): Promise<IUser> =>
        User.findOne(params),
    findManyByParams: (params: QueryFilter<IUser>): Promise<IUser[]> =>
        User.find(params),

    findById: (userId: string): Promise<IUser | null> => User.findById(userId),

    updateById: (
        userId: string,
        params: UpdateQuery<IUser>,
    ): Promise<IUser | null> =>
        User.findByIdAndUpdate(userId, params, { returnDocument: "after" }),
};
