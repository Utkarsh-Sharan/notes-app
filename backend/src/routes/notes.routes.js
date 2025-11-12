import express from "express";
import {
  getAllNotes,
  createANote,
  updateANote,
  deleteANote,
} from "../controllers/notes.controllers.js";

const router = express.Router();

router.get("/", getAllNotes);

router.post("/create-note", createANote);

router.put("/update-note/:id", updateANote);

router.delete("/delete-note/:id", deleteANote);

export default router;
