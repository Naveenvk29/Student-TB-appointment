import jwt from "jsonwebtoken";

const generateToken = async (resizeBy, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 5 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
