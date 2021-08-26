import { Router } from "express";
import Category from "./model/Category";

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  // instanciando classe para poder pegar o ID de constructor
  const category = new Category();

  Object.assign(category, {
    name,
    description,
    created_at: new Date(),
  });

  categories.push(category);

  return res.status(201).send();
});

export { categoriesRoutes };
