import { QueryFilter } from "mongoose";

import { IToken, ITokenCreateDto } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

export const tokenRepository = {
    create: (dto: ITokenCreateDto): Promise<IToken> => {
        return Token.create(dto);
    },
    findByParams: (params: QueryFilter<IToken>): Promise<IToken[]> => {
        return Token.find(params);
    },
};
