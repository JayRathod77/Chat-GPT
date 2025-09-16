import mongoose from "mongoose";

const connectDb = async (req, res) => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("connect to mongodb"));
  } catch (error) {
    console.log("mongodb connection error");
  }
};

export default connectDb;
