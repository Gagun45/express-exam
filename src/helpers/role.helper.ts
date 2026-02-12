import { rolePermissions } from "../constants/role-permissions.constants";
import { RolePower } from "../constants/role-power.constants";
import { PermissionsEnum } from "../enums/permissions.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";

export const roleHelper = {
    assertRoleIsHigher: (
        requestRole: UserRolesEnum,
        targetRole: UserRolesEnum,
    ) => {
        if (RolePower[targetRole] >= RolePower[requestRole]) {
            throw new ApiError("Role too high", StatusCodesEnum.FORBIDDEN);
        }
    },
    assertUserIsNotAdmin: (user: IUser) => {
        if (user.role === UserRolesEnum.ADMIN) {
            throw new ApiError(
                "Forbidden to modify an admin",
                StatusCodesEnum.FORBIDDEN,
            );
        }
    },
    assertRoleHasPermission: (
        role: UserRolesEnum,
        permission: PermissionsEnum,
    ) => {
        if (!rolePermissions[role].includes(permission)) {
            throw new ApiError("Not permitted", StatusCodesEnum.FORBIDDEN);
        }
    },
};
