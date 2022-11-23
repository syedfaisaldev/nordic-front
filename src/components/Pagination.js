const PagiNation = ({
  currentPage,
  setPage,
  lastPage,
  loading,
  getNext,
  getPrev,
}) => {
  return (
    <div className="flex justify-center gap-x-4">
      <button
        disabled={loading}
        className="w-10"
        onClick={() => {
          if (currentPage > 1) setPage((state) => (state -= 1));
          getPrev();
        }}
      >
        {"<"}
      </button>
      <p className="w-10 text-ellipsis">{currentPage}</p>
      <button
        disabled={loading}
        className="w-10"
        onClick={() => {
          if (currentPage < lastPage) setPage((state) => (state += 1));
          getNext();
        }}
      >
        {">"}
      </button>
    </div>
  );
};

export default PagiNation;
