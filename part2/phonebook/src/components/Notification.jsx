const Notification = ({ message, isError }) => {
  if (message === null) return null;

  return (
    <div style={{ color: isError ? "red" : "green" }} className="error">
      {message}
    </div>
  );
};

export default Notification;
