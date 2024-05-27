import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { BAD_REQUEST, CREATED_CODE, SERVER_CODE, SUCCESS_CODE } from "../constants/code.constant";
import { PostModel } from "../models/post.model";
import { CategoryModel } from "../models/category.model";
import { TagModel } from "../models/tag.model";
import { Tag } from "../types/tag.type";
import { getPageAndRowsValue } from "../util/fetcher.util";

export class PostController {
    static async index(request: Request, response: Response) {
        const result = getPageAndRowsValue(request);

        try {
            const model = new PostModel();
            const posts = await model.findAll(result.parsedPage, result.parsedRows);
            const rows = await model.countRows();

            return response.status(SUCCESS_CODE).json({
                count: rows,
                data: posts
            });
        }
        catch(error) {
            return response.status(SERVER_CODE).json({
                message: "Something went wrong",
                detail: error
            });
        }
    } 

    static async store(request: Request, response: Response) {
        const { title, description, categoryId, tags } = matchedData(request);

        try {
            if (!request.file) {
                return response.status(BAD_REQUEST).json({
                    message: "Attached file is supported"
                });
            }
            
            const postModel = new PostModel();
            const categoryModel = new CategoryModel();
            const tagModel = new TagModel();

            const existingCategory = await categoryModel.find(+categoryId);
            let dbTags: Tag[] = [];
            const sanitizedTagIds = await PostController.sanitizeTags(tags);

            for(let tag of sanitizedTagIds) {
                const existingTag = await tagModel.find(tag.tagId);
                dbTags.push(existingTag!);
            }

            const addedPost = await postModel.insert({
                title, 
                description, 
                category: existingCategory!,
                image: `/storage/posts/${request.file?.filename}`,
                tags: dbTags
            });

            return response.status(CREATED_CODE).json({
                message: "Post added successfully",
                data: addedPost
            });
        }
        catch(error) {
            return response.status(SERVER_CODE).json({
                message: "Something went wrong",
                detail: error
            });
        }
    }

    private static async sanitizeTags(value: string) {
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

        return tags;
    }

    static async update(request: Request, response: Response) {
        const { id, title, description, categoryId } = matchedData(request);

        try {
            const postModel = new PostModel();
            const categoryModel = new CategoryModel();

            const existingCategory = await categoryModel.find(+categoryId);
            const existingPost = await postModel.find(+id);
            existingPost!.title = title;
            existingPost!.description = description;
            existingPost!.category = existingCategory!;
            const updatedPost = await postModel.update(existingPost!);
            
            return response.status(SUCCESS_CODE).json({
                message: "Post updated successfully",
                data: updatedPost
            });
        }
        catch(error) {
            return response.status(SERVER_CODE).json({
                message: "Something went wrong",
                detail: error
            });
        }
    }

    static async destroy(request: Request, response: Response) {
        const { id } = matchedData(request);
        try {
            const model = new PostModel();
            await model.delete(+id);

            return response.status(SUCCESS_CODE).json({
                message: "Post deleted successfully"
            });
        }
        catch(error) {
            return response.status(SERVER_CODE).json({
                message: "Something went wrong",
                detail: error
            });
        }
    }

    static async changePostBanner(request: Request, response: Response) {
        const { id } = matchedData(request);

        try {
            if (!request.file) {
                return response.status(BAD_REQUEST).json({
                    message: "Attached file is supported"
                });
            }

            const postModel = new PostModel();
            const existingPost = await postModel.find(+id);
            existingPost!.image = `/storage/posts/${request.file!.filename}`;
            const updatedPost = await postModel.update(existingPost!);

            return response.status(SUCCESS_CODE).json({
                message: "Change post banner successfully",
                data: {
                    imagePath: updatedPost.image
                }
            });
        }
        catch(error) {
            console.log(error);
            return response.status(SERVER_CODE).json({
                message: "Something went wrong",
                detail: error
            });
        }
    }

    static async addTagToPost(request: Request, response: Response) {
        const { id, tagId } = matchedData(request);

        try {
            const tagModel = new TagModel();
            const postModel = new PostModel();

            const existingTag = await tagModel.find(+tagId);
            const updatedPost = await postModel.addTag(+id, existingTag!.id!);

            return response.status(SUCCESS_CODE).json({
                message: "Tag successfully added to post",
            });
        }
        catch(error) {
            return response.status(SERVER_CODE).json({
                message: "Something went wrong",
                detail: error
            });
        }
    }

    static async removeTagFromPost(request: Request, response: Response) {
        const { id, tagId } = matchedData(request);

        try {
            const postModel = new PostModel();
            await postModel.removeTag(+id, +tagId);

            return response.status(SUCCESS_CODE).json({
                message: "Tag successfully removed to post"
            });
        }
        catch(error) {
            return response.status(SERVER_CODE).json({
                message: "Something went wrong",
                detail: error
            });
        }
    }
}