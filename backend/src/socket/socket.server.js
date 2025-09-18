import { Server } from "socket.io";
import generateAiResponse from "../service/ai.service.js";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import messageModel from "../models/message.model.js";

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
    socket.on("ai-message", async (messagePayload) => {
      await messageModel.create({
        chatId: messagePayload.chatId,
        userId: socket.user._id,
        role: "user",
        content: messagePayload.prompt,
      });

      const chatHistory = (await messageModel.find({
        chatId: messagePayload.chatId,
      }).sort({createdAt:-1}).limit(10).lean()).reverse()

      const aiResponse = await generateAiResponse(chatHistory.map(item=>(
        {
          role:item.role,
          parts:[{text:item.content}]
        }
      )));

      await messageModel.create({
        chatId: messagePayload.chatId,
        userId: socket.user._id,
        role: "model",
        content: aiResponse,
      });

      socket.emit("ai-responese", {
        chatId: messagePayload.chatId,
        content: aiResponse,
      });
    });
  });
};

export default initSocketServer;
