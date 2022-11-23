const SelectField = ({ data, field, label, value, setValue, placeholder }) => {
  return (
    <div className="flex flex-col items-start">
      <p className="font-semibold text-sm">{label}</p>
      <select
        disabled={!(data.length > 0)}
        className="w-48 outline-1 outline-black outline px-2 text-lg"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {value === 0 && (
          <option value={0} disabled>
            {placeholder}
          </option>
        )}
        {data.length > 0 &&
          data.map((item, index) => (
            <option value={item[field]} key={index}>
              {item[field]}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectField;
