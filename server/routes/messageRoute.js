import express from "express";
import { addMessage } from "../controller/messageController.js";
const router = express.Router();

router.post('/:chatId',addMessage)
export default router;
