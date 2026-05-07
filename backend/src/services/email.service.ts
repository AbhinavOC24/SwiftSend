import nodemailer from "nodemailer";
import { EMAIL, GOOGLE_APP_PASSWORD } from "../config/env";
import type { EmailPayload } from "../types";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: GOOGLE_APP_PASSWORD,
    },
});

export const sendEmail = async ({ sendTo, subject, body }: EmailPayload) => {
    const info = await transporter.sendMail({
        to: sendTo,
        subject,
        text: body,
        html: `<p>${body}</p>`,
    });

    console.log("Email sent. Preview: %s", nodemailer.getTestMessageUrl(info));
    return info;
};
