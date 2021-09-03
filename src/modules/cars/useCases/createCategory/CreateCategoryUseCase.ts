import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequestDTO {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequestDTO): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Essa categoria já existe!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategoryUseCase;
