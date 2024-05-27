import { body, param } from "express-validator";
import { CategoryModel } from "../models/category.model";

export function validateCategoryId(location: "param" | "body", key: string) {
    const categoryModel = new CategoryModel();
    let validation = location === "param" ? param(key) : body(key);
    return validation
            .trim()
            .notEmpty()
            .withMessage("ID is required")
            .isNumeric()
            .withMessage("Only numbers are allowed")
            .custom(async (value) => {
                const existingCategory = await categoryModel.find(+value);
                if (!existingCategory) {
                    throw new Error("Resource not found");
                }
                return true;
            })
            .escape();
}