import { Router } from "express";
import UserController from "./user.controller.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = Router();

router.post("/", UserController.createUser);
router.post("/login", UserController.login);
router.post("/refershToken", UserController.refreshTokenApi);
router.get("/me", authenticate, UserController.findUser);

export default router;
