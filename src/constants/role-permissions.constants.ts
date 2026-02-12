import { PermissionsEnum } from "../enums/permissions.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";

export const rolePermissions: Record<UserRolesEnum, PermissionsEnum[]> = {
    buyer: [],
    seller: [],
    manager: [
        PermissionsEnum.CHANGE_ACCOUNT_TYPE,
        PermissionsEnum.CHANGE_ROLE,
        PermissionsEnum.CHANGE_BAN_STATUS,
    ],
    admin: Object.values(PermissionsEnum) as unknown as PermissionsEnum[],
} as const;
