import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controller/postController.js";
const router = express.Router();

router.post("/", createPost);

router.get("/:id", getPost);

router.get("/", getPosts);


router.put("/:id", updatePost);

router.delete("/:id", deletePost);
export default router;
