import nodemailer from "nodemailer"
import { EMAIL, GOOGLE_APP_PASSWORD } from "../env";



const testAccount = await nodemailer.createTestAccount();


// const testTransporter = nodemailer.createTransport({
//     host: testAccount.smtp.host,
//     port: testAccount.smtp.port,
//     secure: testAccount.smtp.secure,
//     auth: {
//         user: testAccount.user,
//         pass: testAccount.pass,
//     },
// });
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: GOOGLE_APP_PASSWORD, // The 16-character App Password
    },
});
type EmailPayload = {
    sendTo: string;
    subject: string;
    body: string;
};

export const sendEmail = async ({ sendTo, subject, body }: EmailPayload) => {
    // const info = await testTransporter.sendMail({
    //     from: `"Test App" <${testAccount.user}>`,
    //     to: email,
    //     subject,
    //     text: body,
    //     html: `<p>${body}</p>`,
    // });

    const info = await transporter.sendMail({
        to: sendTo,
        subject,
        text: body,
        html: `<p>${body}</p>`,
    });


    console.log("Preview: %s", nodemailer.getTestMessageUrl(info));


}
