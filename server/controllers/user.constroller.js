import User from "../model/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import createToken from "../utils/createToken.js";
// import mongoose from "mongoose";

const createUser = asyncHandler(async (req, res) => {
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
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      status: user.status,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await User.findOne({ email });
  if (user) {
    const isMatch = await user.isPasswordVaild(password);
    if (isMatch) {
      createToken(res, user._id);
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    return res.status(401).json({ message: "user is not Found" });
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
  const users = await User.find({});

  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
    res.json(user);
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password"); // Use req.user._id for profile access

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
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
  const updateduser = await user.save();
  res.json({
    id: updateduser._id,
    username: updateduser.username,
    email: updateduser.email,
    role: updateduser.role,
    status: updateduser.status,
  });
});

const addteacher = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (req.user.role === "admin") {
    user.role = "teacher";
    const newteacher = await user.save();
    res.json({
      id: newteacher._id,
      username: newteacher.username,
      email: newteacher.email,
      role: newteacher.role,
      status: newteacher.status,
    });
  }
});

const approveStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.status = req.body.status || user.status;

  await user.save();
  res.json({ message: "User status updated successfully" });
});

export {
  createUser,
  loginUser,
  logout,
  getAllUsers,
  getUserById,
  getUserProfile,
  updateUserProfile,
  addteacher,
  approveStatus,
};
