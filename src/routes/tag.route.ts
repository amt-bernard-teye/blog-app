import { Router } from "express";

import { ValidateTokenMiddleware } from "../middlewares/validate-token.middleware";
import { TagController } from "../controllers/tag.controller";
import { validateText } from "../validators/general.validator";
import { TagModel } from "../models/tag.model";
import { EnsureRoleIsAdminMiddleware } from "../middlewares/ensure-role-admin.middleware";
import { RequestMiddleware } from "../middlewares/request.middleware";
import { validateTagId } from "../validators/tag.validator";

export const tagRoute = Router();

tagRoute.get(
    "/tags",
    ValidateTokenMiddleware.run,
    TagController.index
);

tagRoute.post(
    "/tags",
    EnsureRoleIsAdminMiddleware.run,
    validateText("name")
        .custom(async (value) => {
            const model = new TagModel();
            const existingTag = await model.find(value);
            if (existingTag) {
                throw new Error("No duplicates allowed");
            }
            return true
        }).escape(),
    TagController.store
);

tagRoute.put(
    "/tags/:id",
    EnsureRoleIsAdminMiddleware.run,
    validateTagId("param", "id"),
    validateText("name").escape(),
    RequestMiddleware.run,
    TagController.update
);

tagRoute.delete(
    "/tags/:id",
    EnsureRoleIsAdminMiddleware.run,
    validateTagId("param", "id"),
    RequestMiddleware.run,
    TagController.destroy
);