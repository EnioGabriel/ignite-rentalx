// Regra de negócio para atualizar a foto do usuário
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

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

    // Verificando se existe avatar
    if (user.avatar) {
      // Apagando avatar antigo
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    // Atribuindo path do avatar
    user.avatar = avatar_file;

    // Enviando user para o BD
    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
