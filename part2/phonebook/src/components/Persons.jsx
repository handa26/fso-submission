const Persons = ({ persons, onDelete }) => {
  return (
    <ul>
        {persons.map((person) => {
          return (
            <li key={person.id}>
              {person.name} {person.number}
              <button onClick={() => onDelete(person)}>delete</button>
            </li>
          );
        })}
      </ul>
  )
}

export default Persons