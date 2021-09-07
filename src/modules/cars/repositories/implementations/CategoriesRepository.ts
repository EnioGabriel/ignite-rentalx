import CategoryModel from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

import { getRepository, Repository } from "typeorm";

// Singleton: cria uma instancia global da classe

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<CategoryModel>;

  private static INSTANCE: CategoriesRepository;

  // Responsavel pelo armazenamento no BD
  private constructor() {
    this.repository = getRepository(CategoryModel);
  }

  // Responsavel por criar uma instancia ou repassar uma já existente
  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
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
