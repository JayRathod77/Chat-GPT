import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const {
    fullName: { firstName, lastName },
    email,
    password,
  } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "User already exist",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName: { firstName, lastName },
    email,
    password: hashPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

  res.cookie("token", token);

  res.status(201).json({
    message: "User register succesfully",
    user: {
      fullName: user.fullName,
      email: user.email,
      _id: user._id,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email and password",
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "Invalid email and password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

  res.cookie("token", token);

  res.status(201).json({
    message: "User login succesfully",
    user: {
      fullName: user.fullName,
      email: user.email,
      _id: user._id,
    },
  });
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user logout succesfully",
  });
};
export { register, login, logout };
