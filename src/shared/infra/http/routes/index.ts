import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
// usuário não precisa especificaro o caminho da rota para autenticar
router.use(authenticateRoutes);

export { router };
