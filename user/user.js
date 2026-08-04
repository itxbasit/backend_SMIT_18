import { Router } from "express";
import users from '../dummyData.js'
const router = Router();

router.get("/", (req, res) => {
  try {
    res.status(200).send({ status: 200, data: users });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

router.post("/", (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.send({ message: "Name and email are required" });
  }
  users.push({ ...req.body, id: users.length + 1 });
  res.send({ message: "User created successfully" });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((data) => data.id == id);
  if (index != -1) {
    users.splice(index, 1, { ...req.body, id });
  }
});

export default router;