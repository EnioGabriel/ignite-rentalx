import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => email === user.email);
  }
  async findById(id: string): Promise<User> {
    return this.users.find((user) => id === user.id);
  }
}

export { UsersRepositoryInMemory };
