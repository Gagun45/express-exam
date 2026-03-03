import { NextFunction, Request, Response } from "express";

import { PermissionsEnum } from "../enums/permissions.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { ApiError } from "../errors/api.error";
import { generalHelper } from "../helpers/general.helper";
import { roleHelper } from "../helpers/role.helper";
import { IUser } from "../interfaces/user.interface";

export const permissionMiddleware = {
    hasPermission: (permission: PermissionsEnum) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = res.locals.currentUser as IUser;
                roleHelper.assertRoleHasPermission(user.role, permission);
                next();
            } catch (error) {
                next(error);
            }
        };
    },
    assertRoleIsHigherOrEqual: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const currentUser = res.locals.currentUser as IUser;
            const targetUser = res.locals.targetUser as IUser;
            roleHelper.assertRoleIsHigherOrEqual(
                currentUser.role,
                targetUser.role,
            );
            next();
        } catch (error) {
            next(error);
        }
    },
    assertRoleIsHigherStrictly: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const currentUser = res.locals.currentUser as IUser;
            const targetUser = res.locals.targetUser as IUser;
            roleHelper.assertRoleIsHigherStrictly(
                currentUser.role,
                targetUser.role,
            );
            next();
        } catch (error) {
            next(error);
        }
    },
    assertTargetIsNotAdmin: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const targetUser = res.locals.targetUser as IUser;
            roleHelper.assertUserIsNotAdmin(targetUser);
            next();
        } catch (error) {
            next(error);
        }
    },
    preventSelfAction: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const targetUser = res.locals.targetUser as IUser;
            const currentUser = res.locals.currentUser as IUser;
            generalHelper.assertUserObjectIdsAreNotEqual(
                currentUser._id,
                targetUser._id,
            );
            next();
        } catch (error) {
            next(error);
        }
    },
    isAdmin: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentUser = res.locals.currentUser as IUser;
            roleHelper.assertIsAdmin(currentUser.role);
            next();
        } catch (error) {
            next(error);
        }
    },
    isPremium: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentUser = res.locals.currentUser as IUser;
            if (currentUser.accountType !== UserAccountTypesEnum.PREMIUM) {
                throw new ApiError(
                    "Only premium users are allowed",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
            next();
        } catch (error) {
            next(error);
        }
    },
};
