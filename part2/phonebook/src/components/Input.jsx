const Input = ({ label, value, handleChange }) => {
  return (
    <div>
      {label}: <input value={value} onChange={handleChange} />
    </div>
  );
};

export default Input;
