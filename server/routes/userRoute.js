import express from "express";
import {
  deleteUser,
  getNotification,
  getUser,
  getUsers,
  savedPost,
  updateUser,
} from "../controller/userController.js";

const router = express.Router();
router.get("/", getUsers);
// router.get("/:id", getUser);
router.get("/profilePost", savedPost);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/notification", getNotification);
export default router;
