import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";

export const commonMiddleware = {
    isIdValid: (key: string) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = String(req.params[key]);
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError("Invalid id", 400);
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    },
    isBodyValid: (validator: ObjectSchema) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body || {}, {
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
    isQueryValid: (validator: ObjectSchema) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const validatedQuery = await validator.validateAsync(
                    req.query,
                    {
                        stripUnknown: true,
                    },
                );
                res.locals.validatedQuery = { ...validatedQuery };
                next();
            } catch (e) {
                const message =
                    e.details?.map((d: any) => d.message).join(", ") ||
                    "Invalid query";
                next(new ApiError(message, StatusCodesEnum.BAD_REQUEST));
            }
        };
    },
};
