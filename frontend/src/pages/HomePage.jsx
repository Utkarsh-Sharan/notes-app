import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import RateLimitUI from "../components/RateLimitUI.jsx";
import NoteCard from "../components/NoteCard.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const HomePage = () => {
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/v1/notes/");

        setNotes(res.data.data.notes);
        setIsRateLimit(false);
      } catch (error) {
        console.log("Error fetching notes!", error);

        if (error.response?.status === 429) setIsRateLimit(true);
        else toast.error("Failed to load notes!");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimit && <RateLimitUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {notes.length > 0 && !isRateLimit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
