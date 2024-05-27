import { body, param } from "express-validator";

import { TagModel } from "../models/tag.model";
import { PostModel } from "../models/post.model";

export function validateTags() {
    return body("tags")
        .custom(async (value) => {
            const tags = value.split(",").map((tag: string) => {
                const splitId = tag.split(":")[1];
                const sanitizedTagId = splitId.substring(0, splitId.length - 1);
                return {tagId: +sanitizedTagId};
            });
            
            const model = new TagModel();
    
            for(let each of tags) {
                const existingTag = await model.find(each.tagId);
                if (!existingTag) {
                    throw new Error("Tag doesn't exist");
                }
            }

            return true;
        })
        .escape();
}

export function validatePostId(location: "body" | "param", key: string) {
    let validator = location === "param" ? param(key) : body(key);
    return validator
            .trim()
            .notEmpty()
            .withMessage("Post ID is requried")
            .isNumeric()
            .withMessage("Only numbers are allowed")
            .custom(async (value) => {
                const model = new PostModel();
                const existingPost = await model.find(+value);
                if (!existingPost) {
                    throw new Error("Resource not found");
                }
                return true;
            }).escape();
}