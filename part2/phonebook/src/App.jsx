import { useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNum, setNewPhoneNum] = useState("");
  const [filter, setFilter] = useState("");

  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumChange = (event) => {
    setNewPhoneNum(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();

    const existingUser = persons.find((person) => person.name === newName);

    if (existingUser !== undefined) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        id: String(persons.length + 1),
        name: newName,
        number: newPhoneNum,
      };

      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewPhoneNum("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilter={handleFilter} />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={addName}
        nameValue={newName}
        handleNameChange={handleNameChange}
        numberValue={newPhoneNum}
        handleNumberChange={handlePhoneNumChange}
      />

      <h3>Numbers</h3>

      <Persons persons={filtered} />
    </div>
  );
};

export default App;
