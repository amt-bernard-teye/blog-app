import { serverError } from "./error-helper.swagger";

const validationError = {
    "422": {
        description: "Validation Error",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    example: {
                        message: "Validation failed",
                        detail: [
                            {
                                type: "field",
                                value: "",
                                msg: "Name field is requried",
                                path: "name",
                                location: "body"
                            },
                            {
                                type: "field",
                                value: "",
                                msg: "Only letters and whitespaces are allowed",
                                path: "name",
                                location: "body"
                            },
                            {
                                type: "field",
                                value: "",
                                msg: "No duplicates allowed",
                                path: "name",
                                location: "body"
                            }
                        ]
                    }
                }
            }
        }
    },
}

const getCategories = {
    security: [
        { BearerAuth: [] }
    ],
    tags: ["Category"],
    description: "Fetch active all categories from the database",
    responses: {
        "200": {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            count: 1,
                            data: [
                                {
                                    id: 2,
                                    name: "Testing"
                                }
                            ]
                        }
                    }
                }
            }
        },
        ...serverError
    }
};

const createCategory = {
    security: [
        { BearerAuth: [] }
    ],
    tags: ["Category"],
    description: "Creates a new category",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    example: {
                        name: "Entertainment"
                    }
                }
            }
        }
    },
    responses: {
        "201": {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            message: "Category added successfully",
                            data: {
                                id: 1,
                                name: "Entertainment"
                            }
                        }
                    }
                }
            }
        },
        ...validationError,
        ...serverError   
    }
};

const putCategory = {
    security: [
        { BearerAuth: [] }
    ],
    tags: ["Category"],
    description: "Update category",
    parameters: [
        {
            in: "path",
            name: "categoryId",
            schema: {
                type: "number",
                example: 1
            },
            required: true,
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    "$ref": "#/components/schemas/Tag"
                }
            }
        }
    },
    responses: {
        "200": {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            message: "Category updated successfully",
                            data: {
                                id: 1,
                                name: "Entertainment"
                            }
                        }
                    }
                }
            }
        },
        ...validationError,
        ...serverError
    }
};

const deleteCategory = {
    security: [
        { BearerAuth: [] }
    ],
    tags: ["Category"],
    description: "Delete category",
    parameters: [
        {
            in: "path",
            name: "categoryId",
            schema: {
                type: "number",
                example: 1
            },
            required: true,
        }
    ],
    responses: {
        "200": {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            message: "Category deleted successfully"
                        }
                    }
                }
            }
        },
        ...serverError
    }
};

export const categorySwaggerConfig = {
    "/categories": {
        get: getCategories,
        post: createCategory,
    },
    "/categories/{id}": {
        put: putCategory,
        delete: deleteCategory,
    }
}