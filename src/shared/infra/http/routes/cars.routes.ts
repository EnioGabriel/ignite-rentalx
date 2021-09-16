import { Router } from "express";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { ensureAdmin } from "../middleware/ensureAdmin";

const carsRouter = Router();

// Instanciando classe responsável por receber e enviar requisição (Req, Res)
const createCarController = new CreateCarController();

// ensure => middlewares
carsRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

export { carsRouter };
