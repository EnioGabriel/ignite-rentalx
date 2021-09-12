// Regra de negócio para atualizar a foto do usuário
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    user.avatar = avatar_file;

    // Enviando user para o BD
    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
