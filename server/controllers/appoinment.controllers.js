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

const getAllAppointmentsByStudentId = asyncHandler(async (req, res) => {
  // Check if student info is valid
  if (!req.student || !req.student._id) {
    return res.status(400).json({ message: "Invalid student information." });
  }

  try {
    // const testStudentId = "66fe93acdd6eaeba0d8253b3"; // Replace with an actual valid ObjectId
    // const appointments = await Appointment.find({ student: testStudentId });
    const appointments = await Appointment.findOne({
      student: req.student._id,
    });

    if (!appointments || appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this student." });
    }

    res.json(appointments);
  } catch (error) {
    console.error(error); // Log the error for further analysis
    res
      .status(500)
      .json({ message: "An error occurred while retrieving appointments." });
  }
});

const getAppointmentsByTeacherId = asyncHandler(async (req, res) => {});

export {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAllAppointmentsByStudentId,
  getAppointmentsByTeacherId,
};
