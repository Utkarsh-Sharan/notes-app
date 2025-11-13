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

const updateANote = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
    },
    { new: true },
  );

  if (!updatedNote) throw new ApiError(404, "Note not found!");

  res
    .status(200)
    .json(new ApiResponse(200, { updatedNote }, "Note updated successfully!"));
});

const deleteANote = asyncHandler(async (req, res) => {
  const noteToDelete = await Note.findById(req.params.id);
  const { title, description } = {
    title: noteToDelete.title,
    description: noteToDelete.description,
  };
  const deletedNote = await Note.findByIdAndDelete(req.params.id);

  if (!deletedNote) throw new ApiError(404, "Note not found!");

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { title, description },
        "Note deleted successfully!",
      ),
    );
});

export { getAllNotes, createANote, updateANote, deleteANote };
