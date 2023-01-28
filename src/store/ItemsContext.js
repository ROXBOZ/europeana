import { createContext, useContext, useState } from "react";
import { API_KEY } from "../config/apiKey";
import { useEffect } from "react";

export const ItemsContext = createContext();
export const ItemsContextProvider = (props) => {
  const [data, setData] = useState([]);
  const [, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [row] = useState(6);
  const [searchEntry, setSearchEntry] = useState("");
  const [loading, setLoading] = useState(true);
  const url = `https://www.europeana.eu/api/v2/search.json?wskey=${API_KEY} &query=Berlin&query =Kreuzberg&query=Museum FHXB&start=${page}&rows=${row}`;
  const urlAll = `https://www.europeana.eu/api/v2/search.json?wskey=${API_KEY} &query=Berlin&query =Kreuzberg&query=Museum FHXB&start=${page}&rows=999`;

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      console.log("result :>> ", result);
      setLoading(false);
    } catch (error) {
      console.log("Catch: ", error);
      setError(error);
    }
  };

  // fetching the entire API

  const [allData, setAllData] = useState({});
  const fetchAllData = async () => {
    try {
      const promises = [];
      for (let page = 1; page <= 3; page++) {
        const response = await fetch(urlAll);
        const result = await response.json();
        promises.all(result.items);
      }
      setAllData(promises);
      setLoading(false);
    } catch (error) {
      console.log("Catch: ", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  console.log("allData :>> ", allData);

  return (
    <ItemsContext.Provider
      value={{
        data,
        page,
        loading,
        // entireList,
        searchEntry,
        setSearchEntry,
        setPage,
        fetchData,
        // fetchAllData,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
};
