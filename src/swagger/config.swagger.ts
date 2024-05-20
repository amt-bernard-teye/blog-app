import { APP_PORT } from "../constants/env.constant";
import { authSwaggerConfig } from "./auth.swagger";
import { categorySwaggerConfig } from "./category.swagger";
import { tagSwaggerConfig } from "./tag.swagger";

const swaggerConfiguration = {
    openapi: "3.0.1",
    info: {
        title: "Blog Api",
        description: "A blog api that supports 3 users namely: READER, BLOGGER AND ADMIN",
        version: "1.0.0"
    },
    servers: [
        {
            url: `http://localhost:${APP_PORT}/api`,
            description: "Local Server"
        }
    ],
    paths: {
        ...authSwaggerConfig,
        ...categorySwaggerConfig,
        ...tagSwaggerConfig
    },
    tags: [
        { name: "Auth" },
        { name: "Category" },
        { name: "Tag" },
    ],
    components: {
        schemas: {
            Category: {
                type: "object",
                properties: {
                    id: {
                        type: "number",
                        example: 1
                    },
                    name: {
                        type: "string",
                        example: "Entertainment"
                    }
                }
            },
            Tag: {
                type: "object",
                properties: {
                    id: {
                        type: "number",
                        example: 1
                    },
                    name: {
                        type: "string",
                        example: "Programming"
                    }
                }
            }
        },
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer"
            }
        }
    }
}

export { swaggerConfiguration };