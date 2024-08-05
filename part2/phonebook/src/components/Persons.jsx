const Persons = ({ person, onDelete }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={onDelete}>delete</button>
    </li>
  );
};

export default Persons;
