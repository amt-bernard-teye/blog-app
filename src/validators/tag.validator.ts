import { body, param } from "express-validator";

import { TagModel } from "../models/tag.model";

export function validateTagId(location: "body" | "param", key: string) {
    let validator = location === "param" ? param(key) : body(key);
    return validator
        .trim()
        .notEmpty()
        .withMessage("Tag Id is required")
        .isNumeric()
        .withMessage("Only numbers are allowed")
        .custom(async (value) => {
            const model = new TagModel();
            const existingTag = await model.find(+value);
            if (!existingTag) {
                throw new Error("Resource not found");
            }
            return true;
        }).escape();
}