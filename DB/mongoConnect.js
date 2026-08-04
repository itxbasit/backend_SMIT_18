import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB);

    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};
