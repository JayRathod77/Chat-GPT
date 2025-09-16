import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(decode.id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
