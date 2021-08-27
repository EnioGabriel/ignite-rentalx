import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequestDTO {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}
  execute({ name, description }: IRequestDTO): void {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Essa especificação já existe!");
    }

    this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationService };
