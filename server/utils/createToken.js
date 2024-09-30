import jwt from "jsonwebtoken";

const genrateToken = async (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
  res.cookie("jwt", token, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_DEV !== "development",
    httpOnly: true,
  });
};

export default genrateToken;
