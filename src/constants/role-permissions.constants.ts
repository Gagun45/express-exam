import { PermissionsEnum } from "../enums/permissions.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";

export const rolePermissions: Record<UserRolesEnum, PermissionsEnum[]> = {
    buyer: [],
    seller: [],
    manager: [PermissionsEnum.UPDATE_ACCOUNT_TYPE],
    admin: Object.values(PermissionsEnum) as unknown as PermissionsEnum[],
};
