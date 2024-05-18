import { Request, Response } from "express";
import { matchedData } from "express-validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { SERVER_CODE, BAD_REQUEST, SUCCESS_CODE, CREATED_CODE } from "../constants/code.constant";
import { UserModel } from "../models/user.model";
import { AuthToken } from "../util/auth-token.util";
import { User, UserProp } from "../types/user.type";
import { Role } from "@prisma/client";
import { EmailVerification } from "../mail/email-verification.mailer";
import { APP_AUTH_SECRET } from "../constants/env.constant";

export class UserController {
    static async login(request: Request, response: Response) {
        const { email, password } = matchedData(request);

        try {
            const userModel = new UserModel();
            const existingUser = await userModel.findByEmail(email);
            
            if (!existingUser) {
                return response.status(BAD_REQUEST).json({
                    message: "Invalid login credentials",
                });
            }
            
            const hashedPassword = existingUser ? existingUser.password : "";
            const doesPasswordMatch = await bcryptjs.compare(password, hashedPassword);
            
            if (!doesPasswordMatch) {
                return response.status(BAD_REQUEST).json({
                    message: "Invalid login credentials"
                });
            }

            return response.status(SUCCESS_CODE).json({
                message: "Access granted",
                data: {
                    user: UserController.prepareLoginUserData(existingUser),
                    token: AuthToken.generate(existingUser)
                }
            });
        }
        catch(error) {
            return response.status(SERVER_CODE).json({
                message: "Something went wrong",
                detail: error
            });
        }
    }

    private static prepareLoginUserData (existingUser: User) {
        return {
            name: existingUser.name, 
            image: existingUser.image, 
            role: existingUser.role, 
            email: existingUser.email, 
            status: existingUser.status
        };
    }

    static async register(request: Request, response: Response) {
        const {name, email, password} = matchedData(request);

        try {
            const userModel = new UserModel();
            const hashedPassword = await bcryptjs.hash(password, 10);
            const addedUser = await userModel.insert({
                name,
                email,
                password: hashedPassword,
                role: Role.READER,
                image: null
            });

            const token = jwt.sign({id: addedUser.id, email: addedUser.email}, APP_AUTH_SECRET!);
            const emailVerificationMailer = new EmailVerification(addedUser.email, addedUser.name, token);
            await emailVerificationMailer.send();

            return response.status(CREATED_CODE).json({
                message: "Please check your email to complete your registration"
            });
        }
        catch(error) {
            return response.status(SERVER_CODE).json({
                message: "Something went wrong",
                detail: error
            });
        }
    }
}