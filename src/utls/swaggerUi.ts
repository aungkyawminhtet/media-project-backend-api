const swaggerJsdoc = require("swagger-jsdoc");

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
        // url: `http://localhost:${process.env.PORT || 3000}`,
        url: process.env.RENDER_URL || `http://localhost:${process.env.PORT || 3000}`,
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

export const swaggerSpec = swaggerJsdoc(options);
