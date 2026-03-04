/* eslint-disable no-console */
import { randomUUID } from "node:crypto";
import path from "node:path";

import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";

import { config } from "../configs/config";
import { FileItemTypeEnum } from "../enums/file-item-type.enum";
import { ApiError } from "../errors/api.error";

const s3Client = new S3Client({
    region: config.AWS_S3_REGION,
    credentials: {
        accessKeyId: config.AWS_ACCESS_KEY,
        secretAccessKey: config.AWS_SECRET_KEY,
    },
});

const buildPath = (
    itemType: FileItemTypeEnum,
    itemId: string,
    fileName: string,
): string => {
    return `${itemType}/${itemId}/${randomUUID()}${path.extname(fileName)}`;
};

export const s3Service = {
    uploadFile: async (
        file: UploadedFile,
        itemType: FileItemTypeEnum,
        itemId: string,
    ): Promise<string> => {
        try {
            const filePath = buildPath(itemType, itemId, file.name);
            await s3Client.send(
                new PutObjectCommand({
                    Bucket: config.AWS_S3_BUCKET_NAME,
                    Key: filePath,
                    Body: file.data,
                    ContentType: file.mimetype,
                    ACL: config.AWS_S3_ACL,
                }),
            );
            return filePath;
        } catch (e) {
            console.error("s3 upload file error: ", e);
            throw new ApiError("Upload error", 500);
        }
    },
    deleteFile: async (filePath: string): Promise<void> => {
        try {
            await s3Client.send(
                new DeleteObjectCommand({
                    Bucket: config.AWS_S3_BUCKET_NAME,
                    Key: filePath,
                }),
            );
        } catch (error) {
            console.error("s3 delete error: ", error);
            throw new ApiError("Delete file error", 500);
        }
    },
};
