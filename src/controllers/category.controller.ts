import { Request, Response } from "express";
import { matchedData } from "express-validator";

import { CategoryModel } from "../models/category.model";
import { CREATED_CODE, SERVER_CODE, SUCCESS_CODE } from "../constants/code.constant";

export class CategoryController {
    static async index(request: Request, response: Response) {
        const {page, rows} = request.query;

        try {
            const model = new CategoryModel();
            const parsedPage = page ? parseInt(page.toString()) : 0;
            const parsedRows = rows ? parseInt(rows.toString()) : 10;
            const categories = await model.findAll(parsedPage, parsedRows);
            const totalCateories = await model.countRows();

            return response.status(SUCCESS_CODE).json({
                count: totalCateories,
                data: categories,
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
        const { name } = matchedData(request);
        
        try {
            const model = new CategoryModel();
            const addedCategory = await model.insert({name});

            return response.status(CREATED_CODE).json({
                message: "Category added successfully",
                data: addedCategory
            });
        } 
        catch(error) {
            return response.status(SERVER_CODE).json({
                message: "Something went wrong",
                detail: error
            });
        }
    }

    static async update(request: Request, response: Response) {
        const { id, name } = matchedData(request);

        try {
            const model = new CategoryModel();
            const existingCategory = await model.find(id);
            existingCategory!.name = name;
            const updatedCategory = await model.update(existingCategory!);
            
            return response.status(SUCCESS_CODE).json({
                message: "Category updated successfully",
                data: updatedCategory
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
            const model = new CategoryModel();
            await model.delete(id);
            
            return response.status(SUCCESS_CODE).json({
                message: "Category deleted successfully"
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