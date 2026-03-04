import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors/api.error";
import { FileOptionsType } from "../types/file-options.types";

export const fileMiddleware = {
    isFileValid: (fileOptions: FileOptionsType, fieldName: string) => {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const { maxSize, allowedMimeTypes } = fileOptions;
                const file = req.files?.[fieldName] as UploadedFile | undefined;
                if (!file) throw new ApiError("No file uploaded", 400);
                if (!allowedMimeTypes.includes(file.mimetype))
                    throw new ApiError("Invalid file type", 400);

                if (file.size > maxSize)
                    throw new ApiError(
                        `File too large, max size: ${maxSize / 1024 / 1024} MB`,
                        400,
                    );
                next();
            } catch (e) {
                next(e);
            }
        };
    },
};
