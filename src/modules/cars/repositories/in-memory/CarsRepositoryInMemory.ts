import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create({
    name,
    description,
    license_plate,
    daily_rate,
    fine_amount,
    category_id,
    brand,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
      brand,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: String): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  // Retorna todos os carros com disponibilidade para aluguel
  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const all = this.cars.filter((car) => {
      if (
        car.available === true &&
        // Verifica se está preenchido e se é igual ao valor passado
        ((brand && car.brand === brand) ||
          (category_id && car.category_id === category_id) ||
          (name && car.name === name))
      ) {
        return car;
      }
      return null;
    });

    return all;
  }
}

export { CarsRepositoryInMemory };
