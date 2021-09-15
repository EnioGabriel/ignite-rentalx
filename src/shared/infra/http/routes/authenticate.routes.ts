import { Router } from "express";
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

// Instanciando classe responsável por receber e enviar requisição (Req, Res)
const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
