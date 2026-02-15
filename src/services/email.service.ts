import fs from "node:fs/promises";
import path from "node:path";

import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { config } from "../configs/config";
import { emailConstants } from "../constants/email.constants";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { EmailPayloadType } from "../types/email-payload-types";

const transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWORD,
    },
});

const renderTemplate = async (
    templateName: string,
    context: Record<string, any>,
): Promise<string> => {
    const layoutSource = await fs.readFile(
        path.join(process.cwd(), "src", "templates", "base.hbs"),
        "utf-8",
    );
    const layoutTemplate = handlebars.compile(layoutSource);

    const templateSource = await fs.readFile(
        path.join(process.cwd(), "src", "templates", `${templateName}.hbs`),
        "utf-8",
    );
    const childTemplate = handlebars.compile(templateSource);
    const childHtml = childTemplate(context);
    return layoutTemplate({ body: childHtml });
};

export const emailService = {
    sendEmail: async <T extends EmailTypeEnum>(
        type: T,
        to: string,
        context: EmailPayloadType[T],
    ): Promise<void> => {
        const { subject, template } = emailConstants[type];
        await transporter.sendMail({
            to,
            subject,
            html: await renderTemplate(template, context),
        });
    },
};
