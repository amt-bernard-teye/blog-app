import { serverError } from "./error-helper.swagger";

const postIdParam = {
    in: "path",
    name: "id",
    schema: {
        type: "number"
    },
    required: true
};

const tagIdParam = {
    in: "path",
    name: "tagId",
    schema: {
        type: "number"
    },
    required: true
}

const validationError = {
    "422": {
        description: "Validation error",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    example: {
                        message: "Validation failed",
                        detail: [
                          {
                            type: "field",
                            value: "1",
                            msg: "Resource not found",
                            path: "categoryId",
                            location: "body"
                          },
                          {
                            type: "field",
                            value: "Map { \"tagId\": 2 }",
                            msg: "Must be an array of objects, where each contains {tagId: number}",
                            path: "tags",
                            location: "body"
                          },
                          {
                            type: "field",
                            value: "Map { \"tagId\": 2 }",
                            msg: "Property doesn't exist",
                            path: "tags",
                            location: "body"
                          }
                        ]
                      }
                }
            }
        }
    }
}

const getPosts = {
    security: [
        { BearerAuth: [] }
    ],
    tags: ["Post"],
    description: "Fetch all post from the store",
    responses: {
        "200": {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            count: 1,
                            data: {

                            }
                        }
                    }
                }
            }
        },
        ...serverError
    }
};

const createPost = {
    security: [
        { BearerAuth: [] }
    ],
    tags: ["Post"],
    description: "Creates a new post",
    requestBody: {
        content: {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string",
                            example: "Some title"
                        },
                        description: {
                            type: "string",
                            example: "Some desc"
                        },
                        banner: {
                            type: "string",
                            format: "binary",
                        },
                        categoryId: {
                            type: "number",
                            example: 1
                        },
                        tags: {
                            type: "array",
                            example: [
                                {tagId: 1},
                                {tagId: 2},
                            ]
                        }
                    }
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
                            id: 1,
                            title: "Post title",
                            description: "Post description",
                            banner: "http://localhost:300/storage/banner/2323323.jpg",
                            category: {
                                id: 1,
                                name: "Existing category",
                            },
                            tags: [
                                {id: 1, name: "Tag 1"},
                                {id: 2, name: "Tag 2"},
                            ]
                        }
                    }
                }
            }
        },
        ...validationError,
        ...serverError
    }
};

const updatePost = {
    security: [
        { BearerAuth: [] }
    ],
    tags: ["Post"],
    description: "Updates an existing post",
    parameters: [
        {...postIdParam},
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string",
                            example: "Some title",
                        },
                        description: {
                            type: "string",
                            example: "Some desc"
                        },
                        categoryId: {
                            type: "number",
                            example: 10
                        }
                    }
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
                            message: "Post updated successfully",
                            data: {
                                id: 11,
                                title: "Some title",
                                description: "desc",
                                category: {
                                    id: 3,
                                    name: "Entertainment",
                                    status: "ACTIVE"
                                },
                                image: "/storage/posts/PST1716374289558.jpg"
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

const deletePost = {
    security: [
        { BearerAuth: [] }
    ],
    tags: ["Post"],
    description: "Deletes a post from the database",
    parameters: [
        {...postIdParam}
    ],
    responses: {
        "200": {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            message: "Post delete successfully"
                        }
                    }
                }
            }
        },
        ...validationError,
        ...serverError
    }
};

const changePostBanner = {
    security: [
        { BearerAuth: [] }
    ],
    tags: ["Post"],
    description: "Change the banner of a post",
    parameters: [
        {...postIdParam}
    ],
    requestBody: {
        content: {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        banner: {
                            type: "string",
                            format: "binary"
                        }
                    }
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
                            message: "Change post banner successfully",
                            data: {
                                imagePath: "http://localhost:300/storage/banner/2323323.jpg",
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

const addTagToPost = {
    security: [
        { BearerAuth: [] }
    ],
    tags: ["Post"],
    description: "Add tag to an existing post",
    parameters: [
        {...postIdParam}
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        tagId: {
                            type: "integer",
                            example: 2
                        }
                    }
                }
            }
        }
    },
    responses: {
        "200": {

        },
        "422": {
            description: "Validation error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            message: "Validation failed",
                            detail: [
                                {
                                    type: "field",
                                    value: "5",
                                    msg: "Resource not found",
                                    path: "tagId",
                                    location: "body"
                                },
                                {
                                    type: "field",
                                    value: "5",
                                    msg: "Resource not found",
                                    path: "id",
                                    location: "params"
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

const removeTagFromPost = {
    security: [
        { BearerAuth: [] }
    ],
    tags: ["Post"],
    description: "Remove a tag from an existing post",
    parameters: [
        {...postIdParam},
        {...tagIdParam}
    ],
    responses: {
        "200": {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            message: "Tag successfully removed from post"
                        }
                    }
                }
            }
        },
        "422": {
            description: "Validation error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            message: "Validation failed",
                            detail: [
                                {
                                    type: "field",
                                    value: "5",
                                    msg: "Resource not found",
                                    path: "tagId",
                                    location: "params"
                                },
                                {
                                    type: "field",
                                    value: "5",
                                    msg: "Resource not found",
                                    path: "id",
                                    location: "params"
                                }
                            ]
                        }
                    }
                }
            }
        },
        ...serverError
    }
}

export const postSwaggerConfig = {
    "/posts": {
        get: getPosts,
        post: createPost,
    },
    "/posts/{id}": {
        put: updatePost,
        delete: deletePost,
    },
    "/posts/{id}/image": {
        put: changePostBanner,
    },
    "/posts/{id}/tag": {
        put: addTagToPost,
    },
    "/posts/{id}/{tagId}/tag": {
        delete: removeTagFromPost,
    },
}