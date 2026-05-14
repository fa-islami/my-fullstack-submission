const Persons = ({ personsToShow, onDelete }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}{" "}
          <button
            onClick={() => {
              onDelete(person.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
