import { Router } from "express";
import { body } from "express-validator";

import { PostController } from "../controllers/post.controller";
import { ValidateTokenMiddleware } from "../middlewares/validate-token.middleware";
import { EnsureRoleIsAdminMiddleware } from "../middlewares/ensure-role-admin.middleware";
import { RequestMiddleware } from "../middlewares/request.middleware";
import { validateText } from "../validators/general.validator";
import { PostModel } from "../models/post.model";
import { validateCategoryId } from "../validators/category.validator";
import { postBannerUploader } from "../uploads/post.upload";
import { validatePostId, validateTags } from "../validators/post.validator";
import { validateTagId } from "../validators/tag.validator";

export const postRoute = Router();

postRoute.get(
    "/posts",
    ValidateTokenMiddleware.run,
    PostController.index
);

postRoute.post(
    "/posts",
    EnsureRoleIsAdminMiddleware.run,
    postBannerUploader.single("banner"),
    validateText("title")
        .custom(async (value) => {
            const model = new PostModel();
            const existingPost = await model.find(value);
            if (existingPost) {
                throw new Error("Title already exist");
            }
            return true
        }).escape(),
    body("description").trim().notEmpty(),
    validateCategoryId("body", "categoryId"),
    validateTags(),
    RequestMiddleware.run,
    PostController.store
);

postRoute.put(
    "/posts/:id",
    EnsureRoleIsAdminMiddleware.run,
    validateText("title").escape(),
    body("description").trim().notEmpty(),
    validateCategoryId("body", "categoryId"),
    validatePostId("param", "id"),
    RequestMiddleware.run,
    PostController.update
);

postRoute.delete(
    "/posts/:id",
    EnsureRoleIsAdminMiddleware.run,
    validatePostId("param", "id"),
    RequestMiddleware.run,
    PostController.destroy
);

postRoute.put(
    "/posts/:id/image",
    EnsureRoleIsAdminMiddleware.run,
    postBannerUploader.single("banner"),
    validatePostId("param", "id"),
    PostController.changePostBanner
);

postRoute.put(
    "/posts/:id/tag",
    EnsureRoleIsAdminMiddleware.run,
    validateTagId("body", "tagId"),
    validatePostId("param", "id"),
    RequestMiddleware.run,
    PostController.addTagToPost
);

postRoute.delete(
    "/posts/:id/:tagId/tag",
    EnsureRoleIsAdminMiddleware.run,
    validateTagId("param", "tagId"),
    validatePostId("param", "id"),
    RequestMiddleware.run,
    PostController.removeTagFromPost
);