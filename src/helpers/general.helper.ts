import { Types } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";

export const generalHelper = {
    assertObjectIdsAreNotEqual: (
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
};
