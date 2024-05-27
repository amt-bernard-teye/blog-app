import { Router } from "express";

import { CategoryController } from "../controllers/category.controller";
import { CategoryModel } from "../models/category.model";
import { validateText } from "../validators/general.validator";
import { RequestMiddleware } from "../middlewares/request.middleware";
import { validateCategoryId } from "../validators/category.validator";
import { ValidateTokenMiddleware } from "../middlewares/validate-token.middleware";
import { EnsureRoleIsAdminMiddleware } from "../middlewares/ensure-role-admin.middleware";

const categoryRoute = Router();

categoryRoute.get(
    "/categories",
    ValidateTokenMiddleware.run,
    CategoryController.index
);

categoryRoute.post(
    "/categories",
    EnsureRoleIsAdminMiddleware.run,
    validateText("name")
        .custom(async (value) => {
            const categoryModel = new CategoryModel();
            const existingCategory = await categoryModel.find(value);
            if (existingCategory) {
                throw new Error("No duplicates allowed");
            }
            return true;
        }).escape(),
    RequestMiddleware.run,
    CategoryController.store
);

categoryRoute.put(
    "/categories/:id",
    EnsureRoleIsAdminMiddleware.run,
    validateCategoryId("param", "id"),
    validateText("name").escape(),
    RequestMiddleware.run,
    CategoryController.update
);

categoryRoute.delete(
    "/categories/:id",
    EnsureRoleIsAdminMiddleware.run,
    validateCategoryId("param", "id"),
    RequestMiddleware.run,
    CategoryController.destroy
);

export { categoryRoute };