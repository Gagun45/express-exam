import { EmailTypeEnum } from "../enums/email-type.enum";

export type EmailPayloadType = {
    [EmailTypeEnum.DESCRIPTION_EDIT_FAILED]: {
        adId: string;
        description: string;
        userEmail: string;
    };
};
