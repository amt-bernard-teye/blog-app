import nodemailer from "nodemailer";

import { MAIL_PORT, MAIL_ADDRESS, MAIL_HOST, MAIL_PASSWORD } from "../constants/env.constant";

export abstract class Mailer {
    protected configure() {
        return nodemailer.createTransport({
            secure: true,
            port: parseInt(MAIL_PORT!),
            host: MAIL_HOST,
            auth: {
                user: MAIL_ADDRESS,
                pass: MAIL_PASSWORD
            }
        });
    }

    protected abstract createTemplate(): Promise<string>;
    abstract send(): Promise<void>;
}