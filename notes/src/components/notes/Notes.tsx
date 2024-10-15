import { useState, useEffect } from "react";
import axios from "axios";

type Note = {
  id: number;
  content: string;
  important: boolean;
};

// type NotesProps = {
//   notesArr: Note[];
//   setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
// };

const BASE_URL = "http://localhost:3001/notes";

// Component for an individual Note
const Note = ({ content }: { content: string }) => {
  return <li>{content}</li>;
};

// Component for all of our Notes
const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios.get(BASE_URL).then((res) => {
      console.log("promise fulfilled");
      setNotes(res.data);
    });
  }, []);

  // On form submit, we will add the new note to our notes array
  const addNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create a new note object with the current inputted information
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    setNotes([...notes, noteObject]);
    setNewNote("");
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(e.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>{showAll ? "important" : "all"}</button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            content={note.content}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default Notes;
