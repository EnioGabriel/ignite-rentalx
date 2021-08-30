import express from "express";
import { router } from "./routes";

const app = express();

app.use(express.json());

// Chamando o arquivo index.ts, onde está especificando as rotas
app.use(router);

app.listen(3333, () => {
  console.log("🚀️ Server started");
});
