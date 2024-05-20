import { Request } from "express";
import * as jwt from "jsonwebtoken";

import { APP_AUTH_SECRET } from "../constants/env.constant";

export async function validateAuthorizationToken(request: Request) {
    const { authorization } = request.headers;
    const message = "Access denied";
    
    if (!authorization) {
        throw new Error(message);
    }
    
    const token = authorization.split(" ")[1];
    const data = <{ id: string, iat: string } | string>jwt.verify(token, APP_AUTH_SECRET!);
    
    if (typeof data === "string") {
        throw new Error(message);
    }

    return data;
}