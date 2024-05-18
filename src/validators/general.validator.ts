import { body } from "express-validator";
import { UserModel } from "../models/user.model";

export function validateText(field: string) {
    let fieldName = field.substring(0, 1).toUpperCase() + field.substring(1, field.length);

    return body(field)
        .trim()
        .notEmpty()
        .withMessage(`${fieldName} field is requried`)
        .matches(/^[a-zA-Z ]+$/)
        .withMessage("Only letters and whitespaces are allowed");
}

export function validateEmail() {
    const userModel = new UserModel();

    return body("email")
            .trim()
            .notEmpty()
            .withMessage("Email field is required")
            .isEmail()
            .withMessage("Invalid email address")
            .custom(async(value) => {
                const existingUser = await userModel.findByEmail(value);
                if (existingUser) {
                    throw new Error("Email already exist, please try a different one");
                }
                return true;
            }).escape();
}

export function validatePassword() {
    return body("password")
            .trim()
            .notEmpty()
            .withMessage("Password field is required")
            .isLength({min: 8})
            .withMessage("Must be 8 characters or more")
            .custom(value => {
                if (!/^[A-Z]{1}/.test(value)) {
                    throw new Error("Password should start with uppercase letter");
                }
                if (!/\d+/.test(value)) {
                    throw new Error("Password should contain at least a number");
                }
                if (!/[*$@%&?!]{1}/.test(value)) {
                    throw new Error("Password should contain at least any of the following symbols (*$@%&?!)");
                }
                return true;
            })
            .escape();
}

export function validateConfirmPassword() {
    return body("confirmPassword")
            .trim()
            .notEmpty()
            .withMessage("Confirm password field is required")
            .custom((value, {req}) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords do not match each other")
                }
                return true;
            })
            .escape();
}