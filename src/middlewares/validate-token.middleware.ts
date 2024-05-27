import { NextFunction, Request, Response } from "express";

import { UNAUTHORIZED_CODE } from "../constants/code.constant";
import { UserModel } from "../models/user.model";
import { validateAuthorizationToken } from "../validators/authorization-token.validator";

export abstract class ValidateTokenMiddleware {
    static async run(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await validateAuthorizationToken(request);
            const userModel = new UserModel();
            const existingUser = await userModel.find(data.id);
            
            if (!existingUser) {
                throw new Error("Access denied");
            }

            next();
        }
        catch(error) {
            return response.status(UNAUTHORIZED_CODE).json({
                message: "Access denied"
            });
        }
    }

}