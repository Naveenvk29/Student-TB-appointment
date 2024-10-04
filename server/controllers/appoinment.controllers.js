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
  const studentId = req.user._id; // Assuming req.user is populated by an auth middleware
  console.log(studentId);

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ message: "Invalid student ID format" });
  }

  try {
    const appointments = await Appointment.find({ studentId });
    console.log(appointments);

    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching appointments", error: error.message });
  }
});

const getAppointmentsByTeacherId = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;

  // Validate if teacherId is provided
  if (!teacherId) {
    return res.status(400).json({ message: "Teacher ID is required" });
  }

  // Fetch all appointments for the teacher
  const appointments = await Appointment.find({ teacherId });

  // Check if appointments exist
  if (appointments.length === 0) {
    return res
      .status(404)
      .json({ message: "No appointments found for this teacher." });
  }

  res.json(appointments);
});

export {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAllAppointmentsByStudentId,
  getAppointmentsByTeacherId,
};
