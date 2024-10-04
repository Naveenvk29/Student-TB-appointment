import express, { application } from "express";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAllAppointmentsByStudentId,
  getAppointmentsByTeacherId,
} from "../controllers/appoinment.controllers.js";
import {
  authenticatedUser,
  authoriziedAsTeacher,
  authoriziedAsAdmin,
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

router.route("/student").get(authenticatedUser, getAllAppointmentsByStudentId);

router.route("/teacher/:id").get(authenticatedUser, getAppointmentsByTeacherId);

export default router;
