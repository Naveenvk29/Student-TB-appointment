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
  addteacher,
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
  .route("/user/:id")
  .get(
    authenticated,
    authorizationasAdmin,
    authorizationasteacher,
    getUserById
  );

router
  .route("/profile")
  .get(authenticated, getUserProfile)
  .put(authenticated, updateUserProfile);

router.post("/status/:id", authenticated, authorizationasAdmin, approveStatus);
router.post(
  "/add-teacher/:id",
  authenticated,
  authorizationasAdmin,
  addteacher
);

export default router;
