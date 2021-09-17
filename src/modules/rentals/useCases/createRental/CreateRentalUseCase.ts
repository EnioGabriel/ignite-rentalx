import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expect_return_data: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    user_id,
    car_id,
    expect_return_data,
  }: IRequest): Promise<void> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    // Verifica se o usuário já possui um aluguel em aberto
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There is a rental in progress for user");
    }
  }
}

export { CreateRentalUseCase };
