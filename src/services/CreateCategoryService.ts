import CategoriesRepository from "../repositories/CategoriesRepository";

interface IRequestDTO {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: IRequestDTO): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Essa categoria já existe!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategoryService;
