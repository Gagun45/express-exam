import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

export const commonMiddleware = {
    isIdValid: (key: string) => {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params[key];
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError("Invalid id", 400);
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    },
};
