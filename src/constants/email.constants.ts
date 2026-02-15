import { EmailTemplatesEnum } from "../enums/email-template.enum";
import { EmailTypeEnum } from "../enums/email-type.enum";

type EmailConfigType = {
    subject: string;
    template: EmailTemplatesEnum;
};

export const emailConstants: Record<EmailTypeEnum, EmailConfigType> = {
    [EmailTypeEnum.DESCRIPTION_EDIT_FAILED]: {
        subject: "User failed to edit description",
        template: EmailTemplatesEnum.DESCRIPTION_EDIT_FAILED,
    },
};
