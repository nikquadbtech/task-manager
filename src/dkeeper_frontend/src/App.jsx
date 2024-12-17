import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import { dkeeper_backend as dkeeper } from "../../declarations/dkeeper_backend";
import { isAuthenticated, loginWithInternetIdentity, logout } from "./Auth";

function App() {
  const [principalId, setPrincipalId] = useState(() => {
    // Retrieve principalId from localStorage if it exists
    return localStorage.getItem("principalId") || null;
  });
  const [notes, setNotes] = useState([]);

  const handleLogin = async () => {
    try {
      console.log("Attempting login...");
      const principal = await loginWithInternetIdentity();
      console.log("Principal returned:", principal);

      if (principal) {
        setPrincipalId(principal);
        localStorage.setItem("principalId", principal); // Persist principalId
      } else {
        console.error("No principal returned from login");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleLogout = async () => {
    await logout();
    setPrincipalId(null);
    localStorage.removeItem("principalId"); // Clear persistent principalId
  };

  const checkAuthStatus = async () => {
    const authenticated = await isAuthenticated();
    console.log("Authenticated:", authenticated);
  };

  useEffect(() => {
    checkAuthStatus();
    fetchData();
  }, []);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      dkeeper.createNote(newNote.title, newNote.content);
      return [...prevNotes, newNote];
    });
  }

  async function fetchData() {
    const notesArray = await dkeeper.readNotes();
    setNotes(notesArray);
  }
  const updateNote = (id, updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note, index) => (index === id ? updatedNote : note))
    );
  };
  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => index !== id);
    });
  }

  return (
    <div>
      <Header
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        principal={principalId}
      />
      <CreateArea onAdd={addNote} principal={principalId} />
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          onUpdate={updateNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
