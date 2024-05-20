import { Request } from "express";

export function getPageAndRowsValue(request: Request) {
    const { page, rows } = request.query;

    return {
        parsedPage: page ? parseInt(page.toString()) : 0,
        parsedRows: rows ? parseInt(rows.toString()) : 10
    }
}