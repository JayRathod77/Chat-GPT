import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.ObjectId,
      ref: "chat",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    role: {
      type: String,
      enum: ["user", "model"],
      default: "user",
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("message", messageSchema);

export default messageModel;
