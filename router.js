import { Router } from "express";
import fileSystem from "./src/fileSystem/index.js";
import User from "./src/user/users.route.js";

const router = Router();

router.use("/file", fileSystem);
router.use("/user", User);

export default router;
