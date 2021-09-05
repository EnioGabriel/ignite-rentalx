import express from "express";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "./swagger.json";

// Importando arquivo index de config do Typeorm
import "./database";

const app = express();

// Habilita o uso de .json em rotas
app.use(express.json());

// Chamando o arquivo index.ts, onde está especificando as rotas
app.use(router);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3333, () => {
  console.log("🚀️ Server started");
});
