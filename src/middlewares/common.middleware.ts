import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { ApiError } from "../errors/api.error";
import { userService } from "../services/user.service";

export const commonMiddleware = {
    isTargetUserIdValid: (key: string) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = String(req.params[key]);
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError("Invalid id", 400);
                }
                res.locals.targetUserId = id;
                next();
            } catch (e) {
                next(e);
            }
        };
    },
    isBodyValid: (validator: ObjectSchema) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body, {
                    stripUnknown: true,
                    abortEarly: false,
                });
                next();
            } catch (e) {
                const message =
                    e.details?.map((d: any) => d.message).join(", ") ||
                    "Invalid request body";
                next(new ApiError(message, StatusCodesEnum.BAD_REQUEST));
            }
        };
    },
    targetIsNotAdmin: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const targetUserId = res.locals.targetUserId;
            const targetUser = await userService.getById(targetUserId);
            if (targetUser.role === UserRolesEnum.ADMIN) {
                throw new ApiError("Forbidden", StatusCodesEnum.FORBIDDEN);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
