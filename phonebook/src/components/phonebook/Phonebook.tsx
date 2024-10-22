import { useEffect, useState } from "react";
import phoneService from "../../services/phonebook";

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
    phoneService.getAll().then((persons) => {
      setPersons(persons);
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
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      phoneService.addNew(newPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
      });

      // reset input fields to blank
      setNewName("");
      setNewNumber("");
    }
  };
  const handleDelete = (id) => {
    if (window.confirm("delete?")) {
      phoneService.deletePerson(id).then((res) => {
        const returnedPerson = res.data;
        const updatedPersons = persons.filter((person) => {
          // return true - added to new arr
          // return false - gets filtered out
          return person.id != returnedPerson.id;
        });
        setPersons(updatedPersons);
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
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
          <p key={person.id}>
            {person.name}: {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </p>
        );
      })}
    </div>
  );
};

export default Phonebook;
