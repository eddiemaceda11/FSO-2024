import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Notes from "./components/notes/Notes";

const BASE_URL = "http://localhost:3001/notes";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL).then((res) => {
      console.log("promise fulfilled");
      setNotes(res.data);
    });
  }, []);
  console.log("render", notes.length, "notes");

  return (
    <div className="app">
      <Notes
        notesArr={notes}
        setNotes={setNotes}
      />
    </div>
  );
}

export default App;
