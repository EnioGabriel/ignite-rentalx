import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

// Recebe o arquivo e armazena em uma pasta temp
const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (req, res) => {
  // chamando controller responsavel pelas requests e responses
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get("/", (request, response) => {
  // chamando controller responsavel pelas requests e responses
  return listCategoriesController.handle(request, response);
});

// Rota para receber upload de arquivo
categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  const { file } = request;
  console.log(file);

  response.send();
});

export { categoriesRoutes };
