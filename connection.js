import mongoose from "mongoose";

export const connectToDB = async (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));
};