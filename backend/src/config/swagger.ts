import swaggerJsdoc from "swagger-jsdoc";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog App API",
      version: "1.0.0",
      description: "Blog App REST API Documentation",
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
        },
      },
    },
  },

  apis: [path.join(__dirname, "../modules/**/*.route.ts")],
};

export const swaggerSpec = swaggerJsdoc(options);
