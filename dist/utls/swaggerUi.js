"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerServerUrl = process.env.RENDER_URL?.trim() || "/";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Media Backend API",
            version: "1.0.0",
            description: "API documentation for Media Backend project",
        },
        servers: [
            {
                // Relative URL keeps Try it out on the same host when RENDER_URL is not set.
                url: swaggerServerUrl,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./src/routes/*.ts", "./src/utls/schema.ts", "./src/index.ts"],
};
exports.swaggerSpec = swaggerJsdoc(options);
