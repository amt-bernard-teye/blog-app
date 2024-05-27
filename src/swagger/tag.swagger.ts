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

const getTags = {
    security: [
        { BearerAuth: [] }
    ],
    tags: ["Tag"],
    description: "Fetch active all tags from the database",
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

const createTag = {
    security: [
        { BearerAuth: [] }
    ],
    tags: ["Tag"],
    description: "Creates a new tag",
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
                            message: "Tag added successfully",
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

const putTag = {
    security: [
        { BearerAuth: [] }
    ],
    tags: ["Tag"],
    description: "Update tag",
    parameters: [
        {
            in: "path",
            name: "tagId",
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
                            message: "Tag updated successfully",
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

const deleteTag = {
    security: [
        { BearerAuth: [] }
    ],
    tags: ["Tag"],
    description: "Delete tag",
    parameters: [
        {
            in: "path",
            name: "tagId",
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
                            message: "Tag deleted successfully"
                        }
                    }
                }
            }
        },
        ...serverError
    }
};

export const tagSwaggerConfig = {
    "/tags": {
        get: getTags,
        post: createTag,
    },
    "/tags/{id}": {
        put: putTag,
        delete: deleteTag,
    }
}