import CategoriesRepository from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";
import { ImportCategoriesController } from "./ImportCategoryController";

const categoriesRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoriesUseCase(categoriesRepository);
const importCategoryController = new ImportCategoriesController(
  importCategoryUseCase
);

export { importCategoryController };
