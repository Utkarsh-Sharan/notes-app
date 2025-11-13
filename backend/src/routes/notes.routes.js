import express from "express";
import {
  getAllNotes,
  getANote,
  createANote,
  updateANote,
  deleteANote,
} from "../controllers/notes.controllers.js";
import { rateLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = express.Router();

router.route("/").get(rateLimiter, getAllNotes);

router.route("/get-note-by-id/:id").get(rateLimiter, getANote);

router.route("/create-note").post(rateLimiter, createANote);

router.route("/update-note/:id").put(rateLimiter, updateANote);

router.route("/delete-note/:id").delete(rateLimiter, deleteANote);

export default router;
