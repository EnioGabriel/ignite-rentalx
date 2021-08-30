import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (req, res) => {
  // chamando controller responsavel pelas requests e responses
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get("/", (request, response) => {
  // chamando controller responsavel pelas requests e responses
  return listCategoriesController.handle(request, response);
});

export { categoriesRoutes };
