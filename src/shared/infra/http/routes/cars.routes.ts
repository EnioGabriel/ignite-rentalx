import { Router } from "express";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { ensureAdmin } from "../middleware/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

const carsRouter = Router();

// Instanciando classe responsável por receber e enviar requisição (Req, Res)
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

// ensure => middlewares
carsRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRouter.get("/available", listAvailableCarsController.handle);

carsRouter.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

export { carsRouter };
