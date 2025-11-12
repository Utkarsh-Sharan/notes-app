import express from "express";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, "Watch all your notes here!"));
});

router.post("/create-note", (req, res) => {
  res
    .status(201)
    .json(new ApiResponse(201, {}, "New note created successfully!"));
});

router.put("/update-note/:id", (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, "Note updated successfully!"));
});

router.delete("/delete-note/:id", (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, "Note deleted successfully!"));
});

export default router;
