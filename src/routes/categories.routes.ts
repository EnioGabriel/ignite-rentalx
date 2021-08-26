import { Router } from "express";
import CategoriesRepository from "../repositories/CategoriesRepository";
import CreateCategoryService from "../services/CreateCategoryService";

const categoriesRoutes = Router();
// Instanciando objeto
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return res.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const all = categoriesRepository.list();

  return response.status(200).json(all);
});

export { categoriesRoutes };
