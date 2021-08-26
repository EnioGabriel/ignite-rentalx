import CategoryModel from "../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private categories: CategoryModel[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    // Instanciando classe para poder pegar o ID de constructor
    const category = new CategoryModel();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  findByName(name: string): CategoryModel {
    const category = this.categories.find((category) => {
      return category.name === name;
    });

    return category;
  }

  list(): CategoryModel[] {
    return this.categories;
  }
}

export default CategoriesRepository;
