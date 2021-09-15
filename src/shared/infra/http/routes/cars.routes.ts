import { Router } from "express";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

const carsRouter = Router();

// Instanciando classe responsável por receber e enviar requisição (Req, Res)
const createCarController = new CreateCarController();

carsRouter.post("/", createCarController.handle);

export { carsRouter };
