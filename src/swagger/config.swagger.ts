import { APP_PORT } from "../constants/env.constant";
import { authSwaggerConfig } from "./auth.swagger";

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
    },
    tags: [
        {
            name: "Auth"
        }
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer"
            }
        }
    }
}

export { swaggerConfiguration };