const PersonForm = ({
  onSubmit,
  nameValue,
  onNameChange,
  numberValue,
  onNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Name: <input value={nameValue} onChange={onNameChange} />
      </div>
      <div>
        Number:{" "}
        <input type="text" value={numberValue} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
