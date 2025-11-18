import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const __dirname = path.resolve();

//basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//CORS configuration
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
}

//import routes
import notesRoutes from "./routes/notes.routes.js";

app.use("/api/v1/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

export default app;
