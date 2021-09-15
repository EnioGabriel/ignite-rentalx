import Category from "@modules/cars/infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  // Criando um array com alocação em memória
  categories: Category[] = [];

  // Procura por nome de categoria
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => name === category.name);
    return category;
  }

  // Lista todas as categorias
  async list(): Promise<Category[]> {
    const listAll = this.categories;
    return listAll;
  }

  // Cria uma categoria
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    // inserindo valores no objeto de category
    Object.assign(category, {
      name,
      description,
    });

    // Colocando o objeto no array de categorias
    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
