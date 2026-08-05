import { User } from "./user.model.js";

const createUser = async (data) => {
  const user = await User.create(data);
  return user;
};

const findByEmail = async (data) => {
  const user = await User.findOne({ email: data.email });
  return user;
};

const findById = async (id) => {
  const user = await User.findById(id).select("-password");
  return user;
};

export default {
  createUser,
  findByEmail,
  findById,
};
