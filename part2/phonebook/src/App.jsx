import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNum, setNewPhoneNum] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data);
      });
  }, []);

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
