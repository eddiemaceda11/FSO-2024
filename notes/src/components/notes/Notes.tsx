import { useState, useEffect } from "react";

import { type Note } from "../../types";
import noteService from "../../services/notes";

// Component for an individual Note
const Note = ({ note, toggleImportance }: { note: Note; toggleImportance: () => void }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

// Component for all of our Notes
const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  /* HELPER FUNCTIONS */

  // On form submit, we will add the new note to our notes array
  const addNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create a new note object with the current inputted information
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject as Note).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(e.target.value);
  };

  // Toggle the important property of a note using the notes id to update
  const toggleImportanceOf = (id: number) => {
    // find the specific note we want to update
    const note = notes.find((note) => note.id === id);
    // update the note's important property
    const changedNote = { ...note, important: note?.important };

    // Make the put request to update our note on the server
    noteService
      .update(id, changedNote as Note)
      .then((returnedNote) => {
        // update our state/ui/notes array with with servers response
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
      })
      .catch((error) => {
        alert(`The note '${note?.content}' was already deleted from the server`);
        setNotes(notes.filter((note) => note.id !== id));
      });
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
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
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
