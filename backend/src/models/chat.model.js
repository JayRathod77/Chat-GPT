import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  lastActivity: {
    type: Date,
    default: Date.now,
  },
});

const chatModel = mongoose.model("chat", chatSchema);

export default chatModel;
