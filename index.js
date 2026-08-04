// const express = require("express")
import express from "express";
import users from "./dummyData.js";
import cors from "cors";
import fs from "fs-extra";
import usersApi from "./user/user.js";
import file from "./fileSystem/index.js";
import os from "os";
import router from "./router.js";
import mongoose from "mongoose";
import { connectDB } from "./DB/mongoConnect.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

const app = express();

dotenv.config()
const PORT = process.env.PORT;
app.use(express.json());

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  }),
);

connectDB()

// app.use((req, res, next) => {
//   const { sec } = req.headers[""];
//   if (sec == "4680") {
//     next();
//   } else {
//     res.status(404).send({ message: "You aren't authorize" });
//   }
// });


app.use("/v1", router);

app.get("/health", (req, res) => {
  res.json({
    memory: os.freemem(),

    platform: os.arch(),

    uptime: os.homedir(),
  });
});

app.listen(PORT, () => {
  console.log(`Listen at ${PORT}`);
});
