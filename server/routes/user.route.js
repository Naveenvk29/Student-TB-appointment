import express from "express";
import {
  register,
  login,
  logout,
  getAllUsers,
  getUserById,
  getUserProfile,
  updateUserProfile,
  addTeacher,
  approveStatus,
  getUserAppointments,
} from "../controllers/user.controller.js";

import {
  authenticatedUser,
  authoriziedAsAdmin,
} from "../middleware/auth.middlewares.js";

const router = express.Router();

// User Registration

router.route("/").post(register).get(getAllUsers);

// User Login
router.post("/login", login);
// User Logout
router.post("/logout", logout);

// User Profile

router
  .route("/user/:id")
  .get(authenticatedUser, getUserById)
  .put(authenticatedUser, authoriziedAsAdmin, approveStatus);

router
  .route("/profile")
  .get(authenticatedUser, getUserProfile)
  .put(authenticatedUser, updateUserProfile);

// Add a teacher
router.post(
  "/teacher/addnew",
  authenticatedUser,
  authoriziedAsAdmin,
  addTeacher
);

// User Appointments

router.route("/appointments").get(authenticatedUser, getUserAppointments);

export default router;
