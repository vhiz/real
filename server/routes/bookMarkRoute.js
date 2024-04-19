import express from "express";
import { saveBookmark } from "../controller/bookMarkController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, saveBookmark);
export default router;
