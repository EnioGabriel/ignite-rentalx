import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

import { getRepository, Repository } from "typeorm";
import CategoryModel from "../entities/Category";

// Singleton: cria uma instancia global da classe

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<CategoryModel>;

  // Responsável pelo armazenamento no BD
  constructor() {
    this.repository = getRepository(CategoryModel);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async findByName(name: string): Promise<CategoryModel> {
    // Select * from categories where name = 'name'
    const category = await this.repository.findOne({ name });

    return category;
  }

  // Lista todas as categorias
  async list(): Promise<CategoryModel[]> {
    // Select * from categories
    const categories = await this.repository.find();
    return categories;
  }
}

export default CategoriesRepository;
