import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import PropTypes from "prop-types";

const Noteitem = ({ note, updateNote, showAlert }) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      try {
        await deleteNote(note._id);
        showAlert("Deleted successfully", "success");
      } catch (error) {
        console.error("Failed to delete note:", error);
        alert("Error deleting note. Please try again.");
      }
    }
  };

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i
                className="fa-solid fa-trash mx-2"
                onClick={handleDelete}
                style={{ cursor: "pointer" }}
                title="Delete Note"
              ></i>
              <i
                className="fa-regular fa-pen-to-square mx-2"
                onClick={() => {
                  updateNote(note);
                }}
                style={{ cursor: "pointer" }}
                title="Edit Note"
              ></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

// Define prop types
Noteitem.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  updateNote: PropTypes.func.isRequired,
};

export default Noteitem;
