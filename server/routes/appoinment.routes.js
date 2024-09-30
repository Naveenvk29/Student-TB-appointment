import express from "express";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAllAppointmentsofaTeacher,
} from "../controllers/appoinment.controllers.js";
import {
  authenticated,
  authorizationasAdmin,
  authorizationasteacher,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Fetch all appointments (admin access)
router
  .route("/")
  .post(createAppointment)
  .get(authenticated, authorizationasteacher, getAllAppointments);

router
  .route("/:id")
  .get(authenticated, authorizationasteacher, getAppointmentById)
  .put(authenticated, authorizationasteacher, updateAppointment)
  .delete(authenticated, authorizationasAdmin, deleteAppointment);

// Fetch all appointments for a specific teacher
router.get("/teachers/:teacherId", authenticated, getAllAppointmentsofaTeacher);

export default router;
