import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification.jsx";

import personService from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNum, setNewPhoneNum] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const filtered = persons?.filter((person) =>
    person?.name?.toLowerCase().includes(filter.toLowerCase())
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
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((n) => n.id === existingUser.id);
        const changedPerson = { ...person, number: newPhoneNum };

        personService
          .update(existingUser.id, changedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingUser.id ? person : response
              )
            );
            setNewName("");
            setNewPhoneNum("");
          })
          .catch(error => {
            console.log("update error", error);
            setMessage(`Information of ${newName} has already been removed from server`);
            setIsError(true);
            setNewName("");
            setNewPhoneNum("");
            setTimeout(() => {
              setMessage(null);
              setIsError(false);
            }, 3000);
            setPersons(persons.filter(person => person.id !== existingUser.id));
          })
        console.log(person);
      }
    } else {
      const nameObject = {
        name: newName,
        number: newPhoneNum,
      };

      personService.create(nameObject).then((response) => {
        setPersons(persons.concat(response));
        setMessage(`Added ${nameObject.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
        setNewName("");
        setNewPhoneNum("");
      });
    }
  };

  const onDelete = (person) => {
    if (window.confirm(`delete ${person.name}`)) {
      personService.deletePerson(person.id).then(() => {
        setPersons(persons.filter((n) => n.id != person.id));
      });
      alert("deleted!");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} isError={isError} />

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

      <ul>
        {filtered.map((person) => {
          return (
            <Persons
              person={person}
              key={person.id}
              onDelete={() => onDelete(person)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default App;
