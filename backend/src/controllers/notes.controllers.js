import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Note } from "../models/note.models.js";

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();

  if (!notes) throw new ApiError(404, "Notes not found!");

  res
    .status(200)
    .json(new ApiResponse(200, { notes }, "Notes fetched successfully!"));
});

const createANote = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const newNote = new Note({ title, description });

  if (!newNote) throw new ApiError(400, "Failed to create note!");

  await newNote.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new ApiResponse(201, { newNote }, "Note saved successfully!"));
});

const updateANote = async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, "Note updated successfully!"));
};

const deleteANote = async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, "Note deleted successfully!"));
};

export { getAllNotes, createANote, updateANote, deleteANote };
