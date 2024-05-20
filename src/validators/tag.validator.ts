import { param } from "express-validator";

import { TagModel } from "../models/tag.model";

export function validateTagId() {
    return param("id")
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