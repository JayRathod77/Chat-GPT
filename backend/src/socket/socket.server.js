import { Server } from "socket.io";
import Ai from "../service/ai.service.js";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const initSocketServer = (httpServer) => {
  const io = new Server(httpServer, {});

  io.use(async (socket, next) => {
    const { token } = cookie.parse(socket.handshake.headers.cookie || "");

    if (!token) {
      next(new Error("Authentication error: token not found"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await userModel.findById(decoded.id);
      socket.user = user;
      next();
    } catch (error) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {   
    socket.on("ai-message", async ({ prompt }) => {
      const AiResponse = await Ai(prompt);
      socket.emit("ai-responese", { AiResponse });
    });
  });
};

export default initSocketServer;
