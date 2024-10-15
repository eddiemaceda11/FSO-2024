import { useState } from "react";

type Note = {
  id: number;
  content: string;
  important: boolean;
};

type NotesProps = {
  notesArr: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

// Component for an individual Note
const Note = ({ content }: { content: string }) => {
  return <li>{content}</li>;
};

// Component for all of our Notes
const Notes = ({ notesArr, setNotes }: NotesProps) => {
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  // On form submit, we will add the new note to our notes array
  const addNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create a new note object with the current inputted information
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notesArr.length + 1,
    };
    setNotes([...notesArr, noteObject]);
    setNewNote("");
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(e.target.value);
  };

  const notesToShow = showAll ? notesArr : notesArr.filter((note) => note.important === true);

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
