import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { carsRouter } from "./cars.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";
import { rentalRoutes } from "./rental.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRouter);
router.use("/rentals", rentalRoutes);
// usuário não precisa especificar o caminho da rota para autenticar
router.use(authenticateRoutes);

export { router };
