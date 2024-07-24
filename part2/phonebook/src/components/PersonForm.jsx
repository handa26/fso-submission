import Input from "./Input";

const PersonForm = ({ onSubmit, nameValue, handleNameChange, numberValue, handleNumberChange }) => {  
  return (
    <form onSubmit={onSubmit}>
      <Input label="name" value={nameValue} handleChange={handleNameChange} />
      <Input label="number" value={numberValue} handleChange={handleNumberChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
