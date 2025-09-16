import chatModel from "../models/chat.model.js";

const createChat = async (req, res) => {
  const { title } = req.body;
  const user = req.user;

  const chat = await chatModel.create({ title, user: user._id });

  res.status(201).json({
    message: "Chat created succesfully",
    chat: {
      _id: chat._id,
      user: chat.user,
      title: chat.title,
      lastActivity: chat.lastActivity,
    },
  });
};

export default createChat;
