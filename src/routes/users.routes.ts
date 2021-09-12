import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const usersRoutes = Router();

// Envia caminho para o controlador de upload
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  // middleware resposavel pela autenticação
  ensureAuthenticated,
  // middleware para upload de avatar
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
