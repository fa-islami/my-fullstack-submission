const Filter = ({ value, onChange }) => {
  return (
    <>
      filter shown with <input type="text" value={value} onChange={onChange} />
    </>
  );
};

export default Filter;
