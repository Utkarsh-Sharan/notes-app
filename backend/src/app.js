import express from "express";
import cors from "cors";
import { ApiResponse } from "./utils/ApiResponse.js";

const app = express();

//basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//import routes

app.get("/", (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, "Hi from notes app!"));
});

export default app;
