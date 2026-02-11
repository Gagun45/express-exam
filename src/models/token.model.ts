// src/models/Token.model.ts
import { model, Schema } from "mongoose";

import { IToken } from "../interfaces/token.interface";

const TokenSchema = new Schema<IToken>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        refreshToken: { type: String, required: true },
        accessToken: { type: String, required: true },
    },
    { timestamps: true, versionKey: false },
);

export const Token = model<IToken>("Token", TokenSchema);
