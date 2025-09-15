import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stocky Backend API",
      version: "1.0.0",
      description: "API documentation for Stocky assignment project"
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local dev server"
      }
    ]
  },
  apis: ["./src/routes/*.js"], // Look for annotations in routes
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger docs available at http://localhost:5000/docs");
};
