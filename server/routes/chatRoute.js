import express from "express";
import {
  addChat,
  getChat,
  getChats,
  readChat,
} from "../controller/chatController.js";
const router = express.Router();

router.get("/", getChats);
router.get("/:id", getChat);
router.post("/", addChat);
router.put("/read/:id", readChat);

export default router;
