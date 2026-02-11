import { model, Schema } from "mongoose";

import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { IUser } from "../interfaces/user.interface";

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: Object.values(UserRolesEnum),
            default: UserRolesEnum.BUYER,
        },
        accountType: {
            type: String,
            enum: Object.values(UserAccountTypesEnum),
            default: UserAccountTypesEnum.BASIC,
        },
        isBanned: { type: Boolean, default: false },
    },
    { timestamps: true },
);

export const User = model<IUser>("User", UserSchema);
