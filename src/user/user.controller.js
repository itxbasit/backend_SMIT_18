import { accessToken, refreshToken } from "../../utils/token.js";
import userServices from "./user.services.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 12);
    const user = await userServices.createUser({ ...req.body, password });

    res.status(201).send({ message: "User Created Successfully" });
  } catch (err) {
    res.status(404).send({ messgae: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await userServices.findByEmail(req.body);

    if (!user) {
      return res.status(404).send({ messgae: "User not found" });
    }

    const passwordAuthenticate = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!passwordAuthenticate) {
      return res.status(404).send({ messgae: "Invalid credentials" });
    }

    const generateAccessToken = await accessToken(user);
    const generateRefreshToken = await refreshToken(user);
    const userData = user.toObject();

    delete userData.password;
    return res.status(200).send({
      messgae: "Succesfully",
      data: {
        user: userData,
        accessToken: generateAccessToken,
        refreshToken: generateRefreshToken,
      },
    });
  } catch (err) {
    return res.status(404).send({ messgae: err.message });
  }
};

const findUser = async (req, res) => {
  try {
    const user = await userServices.findById(req.body._id);

    res.status(200).send({ message: "Successfully", data: user });
  } catch (err) {
    res.status(404).send({ messgae: err.message });
  }
};

const refreshTokenApi = async (req, res) => {
  try {

    const decode = jwt.verify(
      req.body.refreshToken,
      process.env.refreshTokenKey,
    );

    const user = await userServices.findById(decode._id);

    const generateAccessToken = await accessToken(user);
    const generateRefreshToken = await refreshToken(user);

    res.status(200).send({
      data: {
        user,
        accessToken: generateAccessToken,
        refreshToken: generateRefreshToken,
      },
    });
  } catch (err) {
    res.status(404).send({ messgae: err.message });
  }
};

export default {
  createUser,
  login,
  findUser,
  refreshTokenApi,
};
