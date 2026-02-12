import jwt from "jsonwebtoken";
import { DeleteResult, QueryFilter } from "mongoose";

import { config } from "../configs/config";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypesEnum } from "../enums/token-types.enum";
import { ApiError } from "../errors/api.error";
import {
    IToken,
    ITokenPair,
    ITokenPayload,
} from "../interfaces/token.interface";
import { tokenRepository } from "../repositories/token.repository";

export const tokenService = {
    generateTokens: (payload: ITokenPayload): ITokenPair => {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
            expiresIn: "20m",
        });
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
            expiresIn: "20m",
        });
        return { accessToken, refreshToken };
    },
    verifyToken: (token: string, type: TokenTypesEnum): ITokenPayload => {
        try {
            let secret: string;
            switch (type) {
                case TokenTypesEnum.ACCESS:
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case TokenTypesEnum.REFRESH:
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                default:
                    throw new ApiError(
                        "Invalid token type",
                        StatusCodesEnum.BAD_REQUEST,
                    );
            }
            return jwt.verify(token, secret) as ITokenPayload;
        } catch (e) {
            console.log(e);
            throw new ApiError("Invalid token", StatusCodesEnum.UNAUTHORIZED);
        }
    },
    deleteOneByParams: (params: QueryFilter<IToken>): Promise<DeleteResult> => {
        return tokenRepository.deleteOneByParams(params);
    },
};
