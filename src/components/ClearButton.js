const ClearButton = ({ onClick }) => {
  return (
    <button
      className="bg-blue-100 w-20 rounded py-1 outline outline-1 outline-blue-900"
      type="submit"
      onClick={onClick}
    >
      Clear
    </button>
  );
};

export default ClearButton;
