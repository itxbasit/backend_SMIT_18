import { Router } from "express";
import fileSystem from './fileSystem/index.js'
import user from './user/users.route.js'

const router = Router();

router.use("/file", fileSystem);
router.use("/user", user);

export default router;
