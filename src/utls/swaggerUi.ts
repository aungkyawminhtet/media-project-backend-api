const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation using Swagger UI",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: [
    "./src/routes/*.ts",   // 👈 where your route docs are
    "./src/index.ts"
  ],
};

export const swaggerSpec = swaggerJsdoc(options);