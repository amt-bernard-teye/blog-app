const swaggerConfiguration = {
    openapi: "3.0.1",
    info: {
        title: "Blog Api",
        description: "A blog api that supports 3 users namely: READER, BLOGGER AND ADMIN",
        version: "1.0.0"
    },
    servers: [
        {
            url: "http://localhost:3000"
        }
    ],
    paths: {

    },
    components: {
        
    }
}

export { swaggerConfiguration };