import Appointment from "../model/appointment.model.js";
import asynchandler from "../utils/asyncHandler.js";
const createAppointment = asynchandler(async (req, res) => {
  //   // Check if the user is approved
  if (req.user && req.user.status !== "approved") {
    return res.status(403).json("User is not approved as a student.");
  }

  const studentId = req.user._id;
  const { teacherId, purpose, appointmentTime } = req.body;

  // Validate required fields
  if (!teacherId || !appointmentTime || !purpose) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const extigingAppointments = await Appointment.findOne({
    studentId,
    teacherId,
  });
  if (extigingAppointments) {
    return res.status(400).json({
      message: "An appointment with the same teacher and time already exists.",
    });
  }

  // Check if appointmentTime is a valid future date
  const appointmentDate = new Date(appointmentTime);
  if (appointmentDate <= new Date()) {
    return res
      .status(400)
      .json({ message: "Appointment time must be in the future." });
  }

  try {
    const appointment = await Appointment.create({
      student: studentId,
      teacher: teacherId,
      purpose,
      appointmentTime,
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the appointment." });
  }
});

const getAllAppointments = asynchandler(async (req, res) => {
  const appointments = await Appointment.find()
    .populate("student", "username email")
    .populate("teacher", "username email");
  res.json(appointments);
});

const getAppointmentById = asynchandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate("student", "username email")
    .populate("teacher", "username email");
  if (!appointment)
    return res.status(404).json({ message: "Appointment not found" });

  res.json(appointment);
});

const updateAppointment = asynchandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  if (
    req.user.role === "teacher" &&
    appointment.teacher.toString() !== req.user._id.toString()
  ) {
    return res
      .status(403)
      .json({ message: "Not authorized to update this appointment" });
  }

  if (req.user.role === "admin" || req.user.role === "teacher") {
    appointment.status = req.body.status || appointment.status;
    appointment.appointmentTime =
      req.body.appointmentTime || appointment.appointmentTime;
  }

  const updatedAppointment = await appointment.save();
  res.json(updatedAppointment);
});

const deleteAppointment = asynchandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  if (
    req.user.role !== "admin" &&
    appointment.student.toString() !== req.user._id.toString()
  ) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this appointment" });
  }

  await appointment.remove();
  res.json({ message: "Appointment deleted successfully" });
});

const getAllAppointmentsofaTeacher = asynchandler(async (req, res) => {
  const appointments = await Appointment.find({
    teacher: req.params.id,
  }).populate("student", "username email");
  res.json(appointments);
});

export {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAllAppointmentsofaTeacher,
};
