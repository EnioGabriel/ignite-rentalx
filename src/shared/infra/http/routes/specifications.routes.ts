import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAdmin } from "../middleware/ensureAdmin";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

// Habilitando middleware
specificationsRoutes.use(ensureAuthenticated, ensureAdmin);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
