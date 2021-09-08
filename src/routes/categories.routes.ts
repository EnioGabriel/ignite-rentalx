import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "../modules/cars/useCases/importCategories/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

// Middleware responsável por receber  o arquivo (upload) e armazena em uma pasta temp
const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoriesController();
const listCategoriesController = new ListCategoriesController();

// chamando controller responsavel pelas requests e responses
categoriesRoutes.post("/", createCategoryController.handle);

// chamando controller responsavel pelas requests e responses
categoriesRoutes.get("/", listCategoriesController.handle);

// Rota para receber upload de arquivo
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
