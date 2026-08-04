import { Router } from "express";
import UserController from "./user.controller.js"

const router = Router()

router.post("/", UserController.createUser)
router.post("/login", UserController.login)


export default router