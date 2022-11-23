import { useEffect, useState } from "react";
import "./App.css";
import { host } from "./HostName";
import MyDateRange from "./components/MyDateRange";
import SelectField from "./components/SelectField";
import HourField from "./components/HourField";
import SubmitButton from "./components/SubmitButton";
import ClearButton from "./components/ClearButton";
import TableHeading from "./components/TableHeading";
import TableData from "./components/TableData";
import Loader from "./components/Loader";
import PagiNation from "./components/Pagination";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);

  const [customerId, setCustomerId] = useState(0);
  const [clientId, setClientId] = useState(0);
  const [jobId, setJobId] = useState(0);
  const [toDate, setToDate] = useState("Select To Date");
  const [fromDate, setFromDate] = useState("Select From Date");
  const [hour, setHour] = useState("");

  const [customers, setCustomers] = useState([]);
  const [clients, setClients] = useState([]);
  const [jobs, setJobs] = useState([]);

  const getCustomerIds = async () => {
    try {
      const response = await fetch(`${host}/api/customers`);

      const data = await response.json();

      setCustomers(data.response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClientsByCustomerId = async () => {
    try {
      const response = await fetch(
        `${host}/api/clients?customer_id=${customerId}`
      );

      const data = await response.json();

      setClients(data.response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getJobsByClientId = async () => {
    try {
      const response = await fetch(`${host}/api/jobs?client_id=${clientId}`);

      const data = await response.json();

      setJobs(data.response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFilteredData = async (e) => {
    setCurrentPage(1);
    setLastPage(0);
    setData([]);
    e.preventDefault();

    try {
      const temp = {};

      if (customerId !== 0) temp["customer_id"] = customerId;
      if (clientId !== 0) temp["client_id"] = clientId;
      if (jobId !== 0) temp["job_id"] = jobId;
      if (fromDate !== "Select From Date") temp["date_from"] = fromDate;
      if (toDate !== "Select To Date") temp["date_to"] = toDate;
      if (hour !== 0) temp["hour"] = hour;

      const params = Object.keys(temp);

      let paramsString = `?page=1`;

      params.forEach((item) => {
        paramsString += `${item}=${temp[item]}&`;
      });

      setLoading(true);

      const response = await fetch(`${host}/api/statistics${paramsString}`);

      const data = await response.json();

      setLastPage(data.response.last_page);
      setNextPageUrl(data.response.next_page_url);
      setPrevPageUrl(data.response.prev_page_url);
      setData(data.response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getNextPage = async () => {
    if (nextPageUrl === null) return;

    setData([]);

    try {
      setLoading(true);

      const response = await fetch(`${nextPageUrl}`);

      const data = await response.json();

      setNextPageUrl(data.response.next_page_url);
      setPrevPageUrl(data.response.prev_page_url);
      setData(data.response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getPrevPage = async () => {
    if (prevPageUrl === null) return;

    setData([]);

    try {
      setLoading(true);

      const response = await fetch(`${prevPageUrl}`);

      const data = await response.json();

      setNextPageUrl(data.response.next_page_url);
      setPrevPageUrl(data.response.prev_page_url);
      setData(data.response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const clearAllFields = (e) => {
    e.preventDefault();
    setCustomerId(0);
    setClientId(0);
    setJobId(0);
    setToDate("Select To Date");
    setFromDate("Select From Date");
  };

  useEffect(() => {
    getCustomerIds();
  }, []);

  useEffect(() => {
    getClientsByCustomerId();
  }, [customerId]);

  useEffect(() => {
    getJobsByClientId();
  }, [clientId]);

  return (
    <div className="App flex flex-col gap-y-6 py-2">
      <p className="text-xl font-bold">Welcome</p>
      <form className="flex justify-center items-end gap-x-4">
        <SelectField
          label="Customer Id"
          data={customers}
          field="customer_id"
          value={customerId}
          setValue={setCustomerId}
          placeholder={"Select Customer Id"}
        />
        <SelectField
          label="Client Id"
          data={clients}
          field="client_id"
          value={clientId}
          setValue={setClientId}
          placeholder={"Select Client Id"}
        />
        <SelectField
          label="Job Id"
          data={jobs}
          field="job_id"
          value={jobId}
          setValue={setJobId}
          placeholder={"Select Job Id"}
        />
        <MyDateRange
          fromDate={fromDate}
          setTo={setToDate}
          toDate={toDate}
          setFrom={setFromDate}
        />
        <HourField value={hour} setValue={setHour} label={"Hour"} />
        <SubmitButton onClick={getFilteredData} />
        <ClearButton onClick={clearAllFields} />
      </form>
      <div className="px-20 flex flex-col gap-y-4">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              <TableHeading>Customer Id</TableHeading>
              <TableHeading>Client Id</TableHeading>
              <TableHeading>Job Id</TableHeading>
              <TableHeading>Backupset</TableHeading>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr className="border border-black">
                <td height={60} colSpan={4}>
                  <Loader />
                </td>
              </tr>
            )}
            {data.map((item, index) => (
              <tr key={index}>
                <TableData>{item["customer_id"]}</TableData>
                <TableData>{item["client_id"]}</TableData>
                <TableData>{item["job_id"]}</TableData>
                <TableData>{item["Backupset"]}</TableData>
              </tr>
            ))}
          </tbody>
        </table>
        <PagiNation
          currentPage={currentPage}
          setPage={setCurrentPage}
          lastPage={lastPage}
          loading={loading}
          getNext={getNextPage}
          getPrev={getPrevPage}
        />
      </div>
    </div>
  );
}

export default App;
