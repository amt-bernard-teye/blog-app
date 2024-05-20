import { param } from "express-validator";
import { CategoryModel } from "../models/category.model";

export function validateCategoryId() {
    const categoryModel = new CategoryModel();

    return param("id")
            .trim()
            .notEmpty()
            .withMessage("ID is required")
            .isNumeric()
            .withMessage("Only numbers are allowed")
            .custom(async (value) => {
                const existingCategory = await categoryModel.find(value);
                if (!existingCategory) {
                    throw new Error("Resource not found");
                }
                return true;
            })
            .escape()
}