export const serverError = {
    "500": {
        description: "Server Error",
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
    }
}