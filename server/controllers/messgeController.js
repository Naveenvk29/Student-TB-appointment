import Message from "../model/message.js";
import User from "../model/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const sendMessage = asyncHandler(async (req, res) => {
  if (req.user && req.user.status !== "approved") {
    return res.status(403).json("User is not approved as a student.");
  }
  const studentId = req.user._id;
  const { teacherId, message } = req.body;
  if (!teacherId || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const userExists = await User.findById(teacherId);
  if (!userExists) {
    return res.status(404).json({ message: "Teacher not found." });
  }
  const newMessage = new Message({
    student: studentId,
    teacher: teacherId,
    message,
  });
  await newMessage.save();
  res.status(201).json(newMessage);
});

const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

const deleteMessageById = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    return res.status(404).json({ message: "Message not found." });
  }

  await message.deleteOne();
  res.json({ message: "Message deleted successfully." });
});

export { sendMessage, getAllMessages, deleteMessageById };
