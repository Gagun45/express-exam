import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";

export const preventAdminModification = (user: IUser) => {
    if (user.role === UserRolesEnum.ADMIN) {
        throw new ApiError(
            "Forbidden to modify an admin",
            StatusCodesEnum.FORBIDDEN,
        );
    }
};
