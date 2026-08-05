import { Router } from "express";
import fs from "fs-extra";
import path, { dirname } from "path";
import { cwd } from "process";
import { fileURLToPath } from "url";
import { filePath } from "./services.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { fileName, data, method } = req.body;
    const file = filePath(fileName);
    if (data && data != "") {
      if (method == "w") {
        await fs.writeFile(file, data);
      } else {
        await fs.appendFile(file, data);
      }
    }
    res.status(200).send({ message: `Your ${fileName} created sucessfully` });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { fileName } = req.query;
    const file = filePath(fileName);
    const data = await fs.readFile(file);
    res.status(200).send({ data: data.toString() });
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
});

export default router;
