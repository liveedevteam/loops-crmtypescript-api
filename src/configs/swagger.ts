export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Loops CRM API with Swagger",
      version: "1.0.0",
      description: "A simple API documentation example",
    },
    servers: [
      {
        url: process.env.BE_URL || "http://localhost:3001",
        description: "Development server",
      },
      {
        url: "https://api.example.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
  },
  apis: ["./src/routes/auths/docs/*.docs.ts", "./src/models/*.ts"], // Path to the API docs
  security: [
    {
      bearerAuth: [],
    },
  ],
};
