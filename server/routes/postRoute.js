import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controller/postController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, createPost);

router.get("/:id", getPost);

router.get("/", getPosts);

router.put("/:id", verifyToken, updatePost);

router.delete("/:id", verifyToken, deletePost);
export default router;
