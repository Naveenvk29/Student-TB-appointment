import User from "../model/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import createToken from "../utils/createToken.js";
import Appointment from "../model/appoinment.model.js";

const register = asyncHandler(async (req, res) => {
  const { username, email, password, phone, address } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const user = new User({
    username,
    email,
    password,
    phone,
    address,
  });
  try {
    await user.save();
    createToken(res, user._id);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      status: user.status,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findOne({ email });
  if (user) {
    const isMatch = await user.isPasswordVaild(password);
    if (isMatch) {
      createToken(res, user._id);
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
        phone: user.phone,
        address: user.address,
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } else {
    return res.status(401).json({ message: "user not Found" });
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ message: "User logged out" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    status: user.status,
    phone: user.phone,
    address: user.address,
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  user.password = req.body.password || user.password;
  user.phone = req.body.phone || user.phone;
  user.address = req.body.address || user.address;

  const updatedUser = await user.save();
  res.json({
    id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    role: updatedUser.role,
    status: updatedUser.status,
    phone: updatedUser.phone,
    address: updatedUser.address,
  });
});

const addTeacher = asyncHandler(async (req, res) => {
  const { username, email, password, phone, address, department, subject } =
    req.body;

  if (!username || !email || !password || !department || !subject) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const user = new User({
    username,
    email,
    password,
    phone,
    address,
    department,
    subject,
    role: "teacher",
    status: "approved",
  });

  try {
    await user.save();
    createToken(res, user._id);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone,
      address: user.address,
      department: user.department,
      subject: user.subject,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

const approveStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.status = req.body.status || user.status;
  await user.save();
  res.json(user);
});

const getUserAppointments = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("appointments");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, email, phone, address, department, subject } = req.body;

  const user = await User.findById(id);
  if (!user || user.role !== "teacher") {
    return res.status(404).json({ message: "Teacher not found" });
  }

  user.username = username || user.username;
  user.email = email || user.email;
  user.phone = phone || user.phone;
  user.address = address || user.address;
  user.department = department || user.department;
  user.subject = subject || user.subject;

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    department: updatedUser.department,
    subject: updatedUser.subject,
  });
});

const deleteTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user || user.role !== "teacher") {
    return res.status(404).json({ message: "Teacher not found" });
  }

  await user.deleteOne();
  res.json({ message: "Teacher deleted" });
});

export {
  register,
  login,
  logout,
  getAllUsers,
  getUserById,
  getUserProfile,
  updateUserProfile,
  addTeacher,
  approveStatus,
  getUserAppointments,
  updateTeacher,
  deleteTeacher,
};
