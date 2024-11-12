import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import EditNoteModal from "./components/EditNoteModal";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const [currentNote, setCurrentNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const handleEditNote = (note) => {
    setCurrentNote(note);

    // Show the modal
    const modalElement = document.getElementById("editNoteModal");
    if (modalElement) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    }
  };

  return (
    <>
      <Router>
        <NoteState>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Home onEditNote={handleEditNote} showAlert={showAlert} />
                }
              />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
            </Routes>
          </div>
          <EditNoteModal
            note={currentNote}
            onChange={(e) =>
              setCurrentNote({
                ...currentNote,
                [e.target.name]: e.target.value,
              })
            }
            onClose={() => {
              const modalElement = document.getElementById("editNoteModal");
              if (modalElement) {
                const modal = window.bootstrap.Modal.getInstance(modalElement);
                modal.hide();
              }
            }}
            onSave={async () => {
              const modalElement = document.getElementById("editNoteModal");
              if (modalElement) {
                const modal = window.bootstrap.Modal.getInstance(modalElement);
                modal.hide();
              }
            }}
          />
        </NoteState>
      </Router>
    </>
  );
}

export default App;
