import { Role } from "@prisma/client";
import bcryptjs from "bcryptjs";

import { UserModel } from "../models/user.model";
import { ADMIN_NAME, ADMIN_ADDRESS, ADMIN_PASSWORD } from "../constants/env.constant";

export abstract class UserSeeder {
    static async run() {
        const userModel = new UserModel();
        const existingUser = await userModel.findByEmail(ADMIN_ADDRESS!);
        
        if (existingUser) {
            return;
        }

        const hashedPassword = await bcryptjs.hash(ADMIN_PASSWORD!, 10);
        await userModel.insert({
            email: ADMIN_ADDRESS!,
            name: ADMIN_NAME!,
            role: Role.ADMIN,
            image: null,
            password: hashedPassword
        });
    }
}