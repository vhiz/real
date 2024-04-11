import express from "express";
import { saveBookmark } from "../controller/bookMarkController.js";

const router = express.Router();

router.post("/", saveBookmark);
export default router;
