import { ApiResponse } from "../utils/ApiResponse.js";

const getAllNotes = async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, "Watch all your notes here!"));
};

const createANote = async (req, res) => {
  res
    .status(201)
    .json(new ApiResponse(201, {}, "New note created successfully!"));
};

const updateANote = async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, "Note updated successfully!"));
};

const deleteANote = async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, "Note deleted successfully!"));
};

export { getAllNotes, createANote, updateANote, deleteANote };
