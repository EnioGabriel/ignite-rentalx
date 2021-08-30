import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";
import { ImportCategoriesController } from "./ImportCategoryController";

const importCategoryUseCase = new ImportCategoriesUseCase();
const importCategoryController = new ImportCategoriesController(
  importCategoryUseCase
);

export { importCategoryController };
