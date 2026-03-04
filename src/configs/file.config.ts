import { FileTypeEnum } from "../enums/file-type.enum";
import { FileOptionsType } from "../types/file-options.types";

export const FileConfig: Record<FileTypeEnum, FileOptionsType> = {
    avatar: {
        maxSize: 2 * 1024 * 1024,
        allowedMimeTypes: ["image/jpeg", "image/png"],
    },
};
