import { Router } from "express";
import {
  sendMessage,
  getAllMessages,
  deleteMessageById,
} from "../controllers/messgeController.js";
import {
  authenticatedUser,
  authoriziedAsTeacher,
} from "../middleware/auth.middlewares.js";

const router = Router();

// Send Message

router
  .route("/")
  .post(authenticatedUser, sendMessage)
  .get(authenticatedUser, authoriziedAsTeacher, getAllMessages);

// Delete Message

router.delete(
  "/:id",
  authenticatedUser,
  authoriziedAsTeacher,
  deleteMessageById
);

export default router;
