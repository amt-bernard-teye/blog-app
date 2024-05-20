import { Request, Response } from "express";
import { matchedData } from "express-validator";

import { CREATED_CODE, SERVER_CODE, SUCCESS_CODE } from "../constants/code.constant";
import { TagModel } from "../models/tag.model";
import { getPageAndRowsValue } from "../util/fetcher.util";

export class TagController {
    static async index(request: Request, response: Response) {
        try {
            const result = getPageAndRowsValue(request);

            const model = new TagModel();
            const tags = await model.findAll(result.parsedPage, result.parsedRows);
            const totalTags = await model.countRows();

            return response.status(SUCCESS_CODE).json({
                count: totalTags,
                data: tags
            });
        }
        catch(error) {
            return response.status(SERVER_CODE).json({
                message: "Something went wrong"
            });
        }
    }

    static async store(request: Request, response: Response) {
        const { name } = matchedData(request);

        try {
            const model = new TagModel();
            const addedTag = await model.insert({name});

            return response.status(CREATED_CODE).json({
                message: "Tag added successfully",
                data: addedTag
            });
        }
        catch(error) {
            return response.status(SERVER_CODE).json({
                message: "Something went wrong"
            });
        }
    }

    static async update(request: Request, response: Response) {
        const { id, name } = matchedData(request);

        try {
            const model = new TagModel();
            const existingTag = await model.find(+id);
            existingTag!.name = name;
            const updatedTag = await model.update(existingTag!);

            return response.status(SUCCESS_CODE).json({
                message: "Tag updated successfully",
                data: updatedTag
            });
        }
        catch(error) {
            return response.status(SERVER_CODE).json({
                message: "Something went wrong"
            });
        }
    }

    static async destroy(request: Request, response: Response) {
        const { id } = matchedData(request);

        try {
            const model = new TagModel();
            await model.delete(+id);

            return response.status(SUCCESS_CODE).json({
                message: "Tag deleted successfully"
            });
        }
        catch(error) {
            return response.status(SERVER_CODE).json({
                message: "Something went wrong"
            });
        }
    }
}