import express from "express";
import {
  deleteUser,
  getNotification,
  getUser,
  getUsers,
  savedPost,
  updateUser,
} from "../controller/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/", getUsers);
// router.get("/:id", getUser);
router.get("/profilePost", verifyToken, savedPost);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/notification", verifyToken, getNotification);
export default router;
