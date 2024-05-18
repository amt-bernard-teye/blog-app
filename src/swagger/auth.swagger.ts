const login = {
    tags: ["Auth"],
    description: "Login to access other functionalities of the system",
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            example: "admin@mail.com",
                        },
                        password: {
                            type: "string",
                            example: "Admin@123"
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
                            message: "Access granted",
                            data: {
                                user: {
                                    name: "Admin",
                                    image: null,
                                    role: "ADMIN",
                                    email: "admin@mail.com",
                                    status: "PENDING"
                                },
                                token: {
                                    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFEMTAwMCIsImlhdCI6MTcxNTk2MTY5M30.cu_wfW4bzc24dxDCQZyau_AHTLIo-TGFv-50xMKOa2I",
                                    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFEMTAwMCIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE3MTU5NjE2OTN9.Xs-Lx7escIaa_eUtBRjJrp7DyN6h2O5o_EaBPRjeHyY"
                                }
                            }
                        }
                    }
                }
            }
        },
        "400": {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            message: "Invalid login credentials",
                        }
                    }
                }
            }
        },
        "500": {
            description: "Server failure",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            message: "Something went wrong",
                        }
                    }
                }
            }
        }
    }
}


const register = {
    description: "OK",
    tags: ["Auth"],
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            example: "James Smith"
                        },
                        email: {
                            type: "string",
                            example: "james45@gmail.com"
                        },
                        password: {
                            type: "string",
                            example: "James@123"
                        },
                        confirmPassword: {
                            type: "string",
                            example: "James@123"
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
                            message: "Please check your email to complete your registration process"
                        }
                    }
                }
            }
        },
        "422": {
            description: "Validation failed",
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
                                    msg: "Email field is required",
                                    path: "email",
                                    location: "body"
                                },
                                {
                                    type: "field",
                                    value: "",
                                    msg: "Invalid email address",
                                    path: "email",
                                    location: "body"
                                },
                                {
                                    type: "field",
                                    value: "",
                                    msg: "Password field is required",
                                    path: "password",
                                    location: "body"
                                },
                                {
                                    type: "field",
                                    value: "",
                                    msg: "Must be 8 characters or more",
                                    path: "password",
                                    location: "body"
                                },
                                {
                                    type: "field",
                                    value: "",
                                    msg: "Should start with an uppercase letter, contain at least a symbol and number",
                                    path: "password",
                                    location: "body"
                                },
                                {
                                    type: "field",
                                    value: "",
                                    msg: "Confirm password field is required",
                                    path: "confirmPassword",
                                    location: "body"
                                }
                            ]
                        }
                    }
                }
            }
        },
        "500": {
            description: "Server failed",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            message: "Something went wrong"
                        }
                    }
                }
            }
        },
    }
}


export const authSwaggerConfig = {
    "/login": {
        post: login
    },
    "/register": {
        post: register
    }
}