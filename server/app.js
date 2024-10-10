import express from "express";

import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import appoinmentRoutes from "./routes/appoinment.route.js";
import messageRoutes from "./routes/message.route.js";
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.use("/api/appointments", appoinmentRoutes);

app.use("/api/messages", messageRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "Hello, World!" });
  console.log("Hello, World!");
});

export { app };
