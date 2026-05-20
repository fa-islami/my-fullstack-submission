import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/personsService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [message, setMessage] = useState("");
  const [isSucceed, setIsSucceed] = useState(true);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      // console.log(initialPersons);
      setPersons(initialPersons);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existedPerson = persons.some(
      (person) => person.name.toLowerCase() == newName.toLowerCase(),
    );
    if (existedPerson) {
      const changeConfirm = confirm(
        `${newName} is already added to Phonebook, replace the old number with a new one?`,
      );
      if (changeConfirm) {
        const person = persons.find((p) => p.name === newName);
        const changedPerson = { ...person, number: newNumber };

        personsService.update(person.id, changedPerson).then((res) => {
          setPersons(persons.map((p) => (p.id === person.id ? res : p)));
          setIsSucceed(true);
          setMessage(`${res.name}'s number has edited`);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        });
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personsService
      .create(personObject)
      .then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
        setIsSucceed(true);
        setMessage(`Added ${newPerson.name}`);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((err) => {
        setIsSucceed(false);
        setMessage(err.response.data.error);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
  };

  const handleDelete = (id) => {
    const deleteConfirm = confirm(`Are you sure to delete item with id: ${id}`);
    if (!deleteConfirm) return;

    personsService
      .deletePerson(id)
      .then((updatedPersons) => {
        setPersons(persons.filter((p) => p.id !== id));
      })
      .catch((err) => {
        const deletedPerson = persons.find((person) => person.id === id);
        setIsSucceed(false);
        setMessage(
          `information of ${deletedPerson.name} has already been removed from server`,
        );
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
  };

  // CHANGE HANDLER
  const handleNameChange = (e) => {
    // console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    // console.log(e.target.value);
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()),
  );
  const personsToShow = filterValue ? filteredPersons : persons;

  // console.log(personsToShow);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isSucceed={isSucceed} />
      <Filter value={filterValue} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        nameValue={newName}
        numberValue={newNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onDelete={handleDelete} />
    </div>
  );
};

export default App;
