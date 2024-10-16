import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

type Person = {
  name: string;
  number: string;
  id: number;
};

const Phonebook = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    axios.get(BASE_URL).then((res) => {
      setPersons(res.data);
    });
  }, []);

  const addPerson = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // set a variable that will be used to determine if the user already exists
    let userExists = false;
    // loop through the persons array to determine if the user exists by comparing names
    for (let person of persons) {
      if (person.name === newName) {
        // if user exists, set userExist to true
        userExists = true;
      }
    }
    if (userExists === true) {
      alert(`${newName} already exists`);
    }
    // if the user does not exist
    else {
      // generate an id for the new person
      const id = persons.length + 1;
      // add the new person to the array, update state
      setPersons([...persons, { name: newName, number: newNumber, id: id }]);
      // reset input fields to blank
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            required
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            required
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <p>
            {person.name}: {person.number}
          </p>
        );
      })}
    </div>
  );
};

export default Phonebook;
