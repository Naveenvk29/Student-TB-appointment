import express from "express";
import {
  createUser,
  loginUser,
  logout,
  getAllUsers,
  getUserById,
  getUserProfile,
  updateUserProfile,
  approveStatus,
} from "../controllers/user.constroller.js";
import {
  authenticated,
  authorizationasAdmin,
  authorizationasteacher,
} from "../middleware/auth.middleware.js";

const router = express.Router();
router
  .route("/")
  .post(createUser)
  .get(authenticated, authorizationasAdmin, getAllUsers);

router.post("/login", loginUser);
router.post("/logout", logout);

router
  .route("user/:id")
  .get(authenticated, authorizationasAdmin, authorizationasteacher, getUserById)
  .post(authenticated, authorizationasAdmin, approveStatus);

router
  .route("/profile")
  .get(authenticated, getUserProfile)
  .put(authenticated, updateUserProfile);

export default router;
