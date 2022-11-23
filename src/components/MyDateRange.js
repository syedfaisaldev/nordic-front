import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useState } from "react";

const MyDateRange = ({ fromDate, toDate, setTo, setFrom }) => {
  const [show, setShow] = useState(false);

  const togglePicker = () => {
    setShow((state) => !state);
  };

  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "range",
  });

  function handleSelect(ranges) {
    setRange({
      startDate: ranges.range.startDate,
      endDate: ranges.range.endDate,
      key: "range",
    });

    setFrom(new Date(ranges.range.startDate).toLocaleDateString());
    setTo(new Date(ranges.range.endDate).toLocaleDateString());
  }

  return (
    <div className="relative flex flex-col items-center">
      <div className="flex gap-x-3">
        <div className="flex flex-col items-start">
          <p className="font-semibold text-sm">From</p>
          <div
            onClick={togglePicker}
            className="w-48 outline-1 outline-black outline px-2 text-lg text-left cursor-pointer select-none"
          >
            <p>{fromDate}</p>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <p className="font-semibold text-sm">To</p>
          <div
            onClick={togglePicker}
            className="w-48 outline-1 outline-black outline px-2 text-lg text-left cursor-pointer select-none"
          >
            <p>{toDate}</p>
          </div>
        </div>
      </div>
      <div className={`absolute top-14 ${!show && "invisible"}`}>
        <DateRange ranges={[range]} onChange={handleSelect} />
      </div>
    </div>
  );
};

export default MyDateRange;
