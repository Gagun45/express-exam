import { PermissionsEnum } from "../enums/permissions.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";

export const rolePermissions: Record<UserRolesEnum, PermissionsEnum[]> = {
    buyer: [],
    seller: [PermissionsEnum.CREATE_AD],
    manager: [
        PermissionsEnum.CHANGE_ACCOUNT_TYPE,
        PermissionsEnum.CHANGE_ROLE,
        PermissionsEnum.CHANGE_BAN_STATUS,
        PermissionsEnum.CREATE_BRAND_AND_MODEL,
        PermissionsEnum.CREATE_AD,
        PermissionsEnum.VIEW_REPORTS,
        PermissionsEnum.CREATE_CITY,
        PermissionsEnum.CHANGE_AD_STATUS,
    ],
    admin: Object.values(PermissionsEnum) as unknown as PermissionsEnum[],
} as const;
