// src/config/swaggerConfig.js

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Configurações do Swagger/OpenAPI
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Versão da especificação OpenAPI
    info: {
      title: "API de Laudos Periciais",
      version: "1.0.0",
      description: "API para gerenciar e gerar laudos periciais odontológicos",
    },
    servers: [
      {
        url: "http://localhost:5000", // URL do seu backend (ajuste conforme necessário)
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Onde estão as anotações Swagger nas rotas
};

// Gera a especificação com base nas anotações
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Função para conectar o Swagger ao app Express
const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
