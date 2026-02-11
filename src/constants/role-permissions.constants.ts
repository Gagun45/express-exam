import { PermissionsEnum } from "../enums/permissions.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";

export const rolePermissions: Record<UserRolesEnum, PermissionsEnum[]> = {
    buyer: [],
    seller: [],
    manager: [],
    admin: Object.values(PermissionsEnum) as unknown as PermissionsEnum[],
};
