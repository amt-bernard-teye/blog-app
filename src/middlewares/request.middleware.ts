import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { VALIDATION_CODE } from "../constants/code.constant";

export class RequestMiddleware {
    static run(request: Request, response: Response, next: NextFunction) {
        const result = validationResult(request);

        if (!result.isEmpty()) {
            return response.status(VALIDATION_CODE).json({
                message: "Validation failed",
                detail: result.array()
            });
        }

        next();
    }
}