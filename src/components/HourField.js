const HourField = ({ label, value, setValue }) => {
  return (
    <div className="flex flex-col items-start">
      <p className="font-semibold text-sm">{label}</p>
      <input
        value={value}
        onChange={(e) => {
          if (0 <= e.target.valueAsNumber && e.target.valueAsNumber < 24)
            setValue(e.target.value);
        }}
        className="w-48 outline-1 outline-black outline px-2 text-lg"
        type="number"
      />
    </div>
  );
};

export default HourField;
