import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  // objeto "authHeader" chega da seguinte forma "Bearer tokenvalue"
  // const [, token] => deixa de pegar o "Bearer" e pega somente o token
  // split(" ") => separa o conteúdo do obj por espaço
  const [, token] = authHeader.split(" ");

  try {
    // Verificando se é um token válido e pegando o id do usuário
    const { sub: user_id } = verify(
      token,
      "89d785594ba82d50294aad6c6e3b61e2"
    ) as IPayload;

    const userRepository = new UsersRepository();
    const user = userRepository.findById(user_id);

    if (!user) {
      throw new Error("User does not exists");
    }

    // Saindo do middleware
    next();
  } catch {
    throw new Error("Inválid token");
  }
}
