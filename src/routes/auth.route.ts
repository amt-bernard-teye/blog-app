import { Router } from "express";
import { body } from "express-validator";

import { UserController } from "../controllers/user.controller";
import { RequestMiddleware } from "../middlewares/request.middleware";
import { validateText, validateEmail, validatePassword, validateConfirmPassword } from "../validators/general.validator";

const authRoute = Router();

authRoute.post(
    "/login",
    body("email").trim().notEmpty().escape(),
    body("password").trim().notEmpty().escape(),
    RequestMiddleware.run,
    UserController.login
);

authRoute.post(
    "/register",
    validateText("name").escape(),
    validateEmail(),
    validatePassword(),
    validateConfirmPassword(),
    RequestMiddleware.run,
    UserController.register
);

export { authRoute };