import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import createChat from "../controller/chat.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createChat);

export default router;
