import ejs from "ejs";
import path from "path";

import { Mailer } from "./mailer.mail";
import { MAIL_ADDRESS } from "../constants/env.constant";

export class EmailVerification extends Mailer {
    constructor(
        private entityEmail: string,
        private entityName: string,
        private generatedToken: string
    ) { 
        super();
    }

    protected createTemplate(): Promise<string> {
        const templatePath = path.join(__dirname, "../", "views", "email-verification.ejs");
        return ejs.renderFile(templatePath, {
            name: this.entityName,
            token: this.generatedToken
        });
    }

    async send(): Promise<void> {
        let transporter = this.configure();
        let htmlContent = await this.createTemplate();

        await transporter.sendMail({
            from: MAIL_ADDRESS,
            to: this.entityEmail,
            subject: "Email Verification",
            html: htmlContent
        });
    }
}