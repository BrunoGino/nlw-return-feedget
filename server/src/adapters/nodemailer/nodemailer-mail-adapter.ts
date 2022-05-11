import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "3506815c76d082",
        pass: "00d0c2fb30dea8"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ body, subject }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Bruno Gino <macarrao@gmail.com>',
            subject,
            html: body,
        });
    };

}