import { useState } from "react";

type Note = {
  id: number;
  content: string;
  important: boolean;
};

type NotesProps = {
  notesArr: Note[];
};

const Note = ({ content }: { content: string }) => {
  return <li>{content}</li>;
};

const Notes = ({ notesArr }: NotesProps) => {
  const [notes, setNotes] = useState(notesArr);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    setNotes([...notes, noteObject]);
    setNewNote("");
  };

  const handleNoteChange = (e) => {
    console.log(e.target.value);
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
