const SubmitButton = ({ onClick }) => {
  return (
    <button
      className="bg-green-100 w-20 rounded py-1 outline outline-1 outline-green-900"
      type="submit"
      onClick={onClick}
    >
      Search
    </button>
  );
};

export default SubmitButton;
