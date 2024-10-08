import Appointment from "../model/appoinment.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../model/user.model.js";

const createAppointment = asyncHandler(async (req, res) => {
  if (req.user && req.user.status !== "approved") {
    return res.status(403).json("User is not approved as a student.");
  }

  const studentId = req.user._id;
  const { teacherId, purpose, appointmentTime } = req.body;

  if (!teacherId || !appointmentTime || !purpose) {
    return res.status(400).json({ message: "All fields are required." });
  }
  // Check if the appointment time already exists for the same student and teacher
  const existingAppointments = await Appointment.findOne({
    student: studentId,
    teacher: teacherId,
    appointmentTime,
  });

  if (existingAppointments) {
    return res
      .status(400)
      .json({ message: "An appointment at the same time already exists." });
  }

  // Check if the appointment time is in the future
  const appointmentDate = new Date(appointmentTime);
  if (appointmentDate <= new Date()) {
    return res
      .status(400)
      .json({ message: "Appointment time must be in the future." });
  }

  // Create new appointment
  const appointment = await Appointment.create({
    student: studentId,
    teacher: teacherId,
    purpose,
    appointmentTime,
  });

  // Add appointment to the teacher's appointments
  const teacher = await User.findById(teacherId);
  if (teacher) {
    teacher.appointments.push(appointment._id);
    await teacher.save();
  }

  // Add appointment to the student's appointments
  const student = await User.findById(studentId);
  if (student) {
    student.appointments.push(appointment._id);
    await student.save();
  }

  // Respond with the created appointment
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
  appointment.feedback = req.body.feedback || appointment.feedback;
  appointment.status = req.body.status || appointment.status;
  const updatedAppoinment = await appointment.save();
  res.json({
    _id: updatedAppoinment._id,
    studentId: appointment.studentId,
    teacherId: appointment.teacherId,
    purpose: appointment.purpose,
    appointmentTime: appointment.appointmentTime,
    feedback: appointment.feedback,
    status: appointment.status,
  });
});

const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found." });
  }
  await appointment.deleteOne();
  res.json({ message: "Appointment deleted successfully." });
});

export {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
