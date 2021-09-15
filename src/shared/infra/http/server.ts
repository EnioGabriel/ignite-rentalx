import express, { NextFunction, Request, Response } from "express";
// Responsável por continuar a aplicação após ocorrer um erro
import "express-async-errors";
// Importando arquivo index de config do Typeorm
import "@shared/infra/typeorm";
import "@shared/container";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../../../swagger.json";
import { AppError } from "@shared/errors/AppError";

const app = express();

// Habilita o uso de .json em rotas
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Chamando o arquivo index.ts, onde está especificando as rotas
app.use(router);

// Tratativa de erros do tipo AppError para aparecer no response da requisição
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);
app.listen(3333, () => {
  console.log("🚀️ Server started");
});
