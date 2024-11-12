import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import EditNoteModal from "./EditNoteModal";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, [navigate, getNotes]);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });

    // Show the modal
    const modalElement = document.getElementById("editNoteModal");
    if (modalElement) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    }
  };

  const handleSave = async () => {
    try {
      await editNote(note.id, note.etitle, note.edescription, note.etag);
      props.showAlert("Updated successfully", "success");

      // Close the modal
      const modalElement = document.getElementById("editNoteModal");
      if (modalElement) {
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      }

      // Re-fetch notes if needed
      await getNotes();
    } catch (error) {
      console.error("Failed to edit note:", error);
    }
  };
  const onChange = (e) => {
    setNote((prevNote) => ({ ...prevNote, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <EditNoteModal
        note={note}
        onChange={onChange}
        onClose={() => {
          const modalElement = document.getElementById("editNoteModal");
          if (modalElement) {
            const modal = window.bootstrap.Modal.getInstance(modalElement);
            modal.hide();
          }
        }}
        onSave={handleSave}
      />
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && <p>No notes</p>}
        </div>
        {notes.map((note) => {
          if (!note || !note._id) {
            return null;
          }
          return (
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              note={note}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
