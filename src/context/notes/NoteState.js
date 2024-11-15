import NoteContext from "./noteContext";
import { useState, useEffect } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5004";
  const [notes, setNotes] = useState([]);

  // Get all Notes
  const getNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to fetch notes:", errorData);
        // Reset notes on fetch
        setNotes([]);
        return;
      }
      const json = await response.json();

      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        console.error("Unexpected data format:", json);
        setNotes([]);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  // Adding a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Add failed:", errorData);
        return;
      }

      const note = await response.json();
      setNotes((prevNotes) => [...prevNotes, note]);
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Delete failed:", errorData);
        return;
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // Update a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        return;
      }
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        return;
      }
      const updatedNote = await response.json();
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? updatedNote : note))
      );
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
