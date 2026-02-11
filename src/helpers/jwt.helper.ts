import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";

export const getTokenFromHeader = (authHeader?: string): string => {
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new ApiError(
            "Authorization token missing",
            StatusCodesEnum.UNAUTHORIZED,
        );
    }
    return authHeader.split(" ")[1];
};
