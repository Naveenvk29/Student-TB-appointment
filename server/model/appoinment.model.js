import mongoose from "mongoose";

const appoinmentSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointmentTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "canceled"],
      default: "pending",
    },
    purpose: {
      type: String,
      trim: true,
    },
    feedback: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appoinmentSchema);

export default Appointment;
