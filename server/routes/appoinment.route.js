import express from "express";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appoinment.controllers.js";
import {
  authenticatedUser,
  authoriziedAsTeacher,
} from "../middleware/auth.middlewares.js";

const router = express.Router();

router
  .route("/")
  .post(authenticatedUser, createAppointment)
  .get(authenticatedUser, getAllAppointments);

router
  .route("/:id")
  .get(authenticatedUser, getAppointmentById)
  .put(authenticatedUser, authoriziedAsTeacher, updateAppointment)
  .delete(authenticatedUser, authoriziedAsTeacher, deleteAppointment);

export default router;
