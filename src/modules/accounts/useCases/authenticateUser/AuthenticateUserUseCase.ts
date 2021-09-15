import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Verifica se existe usuario e se for true, retorna o objeto do user
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    // Verificando se a senha passada pelo user bate com a senha criptografada no BD
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    // Gerando o JWT
    const token = sign({}, "89d785594ba82d50294aad6c6e3b61e2", {
      //  subject => id que está gerando o token
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    // Retornando dados para o front (client)
    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
