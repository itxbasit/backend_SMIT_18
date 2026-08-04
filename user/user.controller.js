import userServices from "./user.services.js";
import bcrypt from "bcrypt";

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
    
    const userData = user.toObject(); 
  
    delete userData.password;
    return res.status(200).send({ messgae: "Succesfully", data: userData });
  } catch (err) {
    return res.status(404).send({ messgae: err.message });
  }
};

export default {
  createUser,
  login,
};
