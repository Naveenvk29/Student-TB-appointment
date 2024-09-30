import express from "express";
import cookieParser from "cookie-parser";

// routes
import userRoutes from "./routes/user.route.js";
import appointmentRoutes from "./routes/appoinment.routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//
app.use("/api/users", userRoutes);

app.use("/api/appointments", appointmentRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "Hello World!" });
  console.log("Hello World!");
});

export { app };
