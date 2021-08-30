import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  // Instanciando classe CreateSpecificationUseCase sempre que a classe é chamada
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  // Controla req e res da rota
  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    this.createSpecificationUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
