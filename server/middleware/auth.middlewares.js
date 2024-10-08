import User from "../model/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const authenticatedUser = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("Decoded JWT:", decoded);
      req.user = await User.findById(decoded.userId).select("-password");
      // console.log("User:", req.user);
      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized, access denied" });
  }
});

const authoriziedAsTeacher = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "teacher") {
    return res
      .status(403)
      .json({ message: "access denied. only teacher or admin can access" });
  }
  next();
};

const authoriziedAsAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "access denied. only admin can access" });
  }
  next();
};

export { authenticatedUser, authoriziedAsTeacher, authoriziedAsAdmin };
