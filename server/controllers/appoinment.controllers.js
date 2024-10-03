import Appointment from "../model/appoinment.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const createAppointment = asyncHandler(async (req, res) => {
  if (req.user && req.user.status !== "approved") {
    return res.status(403).json("User is not approved as a student.");
  }
  const studentId = req.user._id;
  const { teacherId, purpose, appointmentTime } = req.body;

  if (!teacherId || !appointmentTime || !purpose) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const extigingAppointments = await Appointment.findOne({
    studentId,
    teacherId,
    appointmentTime,
  });
  if (extigingAppointments) {
    return res
      .status(400)
      .json({ message: "An appointment at the same time already exists." });
  }
  const appointmentDate = new Date(appointmentTime);
  if (appointmentDate <= new Date()) {
    return res
      .status(400)
      .json({ message: "Appointment time must be in the future." });
  }
  const appointment = await Appointment.create({
    student: studentId,
    teacher: teacherId,
    purpose,
    appointmentTime,
  });
  res.status(201).json(appointment);
});

const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({});
  res.json(appointments);
});

const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found." });
  }
  res.json(appointment);
});

const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found." });
  }
});

const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found." });
  }
  await appointment.deleteOne();
  res.json({ message: "Appointment deleted successfully." });
});

const getAllAppointmentsByStudentId = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ studentId: req.params.id });
  res.json(appointments);
});

const getAllAppointmentsByTeacherId = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ teacherId: req.params.id });
  res.json(appointments);
});

export {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAllAppointmentsByStudentId,
  getAllAppointmentsByTeacherId,
};
