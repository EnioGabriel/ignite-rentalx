import { Router } from "express";

import { createCategoryController } from "../modules/cars/model/useCases/createCategory";
import CategoriesRepository from "../modules/cars/repositories/CategoriesRepository";

const categoriesRoutes = Router();
// Instanciando objeto
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
  // chamando controller responsavel pelas requests e responses
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get("/", (request, response) => {
  const all = categoriesRepository.list();

  return response.status(200).json(all);
});

export { categoriesRoutes };
