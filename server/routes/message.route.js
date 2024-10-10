import { Router } from "express";
import {
  sendMessage,
  getAllMessages,
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

export default router;
