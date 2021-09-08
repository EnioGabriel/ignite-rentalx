import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { importCategoryController } from "../modules/cars/useCases/importCategories";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

// Middleware responsável por receber  o arquivo (upload) e armazena em uma pasta temp
const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

// chamando controller responsavel pelas requests e responses
categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (request, response) => {
  // chamando controller responsavel pelas requests e responses
  return listCategoriesController.handle(request, response);
});

// Rota para receber upload de arquivo
categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
