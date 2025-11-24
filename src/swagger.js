import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E4 backend - ZenTrack Core Documentation",
            version: "1.0.0"
        }
    },
    apis: ["./src/routes/*.js"]
});