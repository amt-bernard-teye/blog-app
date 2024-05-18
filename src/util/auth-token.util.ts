import jwt from "jsonwebtoken";

import { User } from "../types/user.type";
import { APP_AUTH_SECRET } from "../constants/env.constant";

export abstract class AuthToken {
    static generate(user: User) {
        const accessTokenDetails = {
            id: user.id
        };
        const accessToken = jwt.sign(accessTokenDetails, APP_AUTH_SECRET!);

        const refreshTokenDetails = {
            id: user.id,
            email: user.email,
        }
        const refreshToken = jwt.sign(refreshTokenDetails, APP_AUTH_SECRET!);

        return {accessToken, refreshToken}
    }
}