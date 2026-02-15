import { Types } from "mongoose";

import { BannedWords } from "../constants/banned-words.constants";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";

export const generalHelper = {
    assertUserObjectIdsAreNotEqual: (
        userId: Types.ObjectId,
        targetUserId: Types.ObjectId,
    ) => {
        if (userId.equals(targetUserId)) {
            throw new ApiError(
                "Self-action not permitted",
                StatusCodesEnum.FORBIDDEN,
            );
        }
    },
    containsBannedWords: (text: string): boolean => {
        const lowerText = text.toLowerCase();
        return BannedWords.some((word) => lowerText.includes(word));
    },
    roundNumber: (amount: number, decimals = 2): number => {
        return Number(amount.toFixed(decimals));
    },
};
