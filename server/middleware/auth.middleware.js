import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const authenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password"); // Ensure correct extraction of user ID
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
});

const authorizationasteacher = (req, res, next) => {
  if (req.user.role === "teacher" || req.user.role == "admin") next();
  else
    return res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
};

const authorizationasAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") next();
  else
    return res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
};

export { authenticated, authorizationasAdmin, authorizationasteacher };
