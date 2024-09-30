import express from "express";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.use(cookieParser());

app.get("/test", (req, res) => {
  res.json({ message: "Hello World!" });
  console.log("Hello World!");
});

export { app };
