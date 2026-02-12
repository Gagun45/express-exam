import { UserRolesEnum } from "../enums/user-roles.enum";

export const RolePower: Record<UserRolesEnum, number> = {
    admin: 3,
    manager: 2,
    buyer: 1,
    seller: 1,
} as const;
