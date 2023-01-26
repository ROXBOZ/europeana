import { createContext, useState } from "react";
import { API_KEY } from "./config";

export const ItemsContext = createContext();
export const ItemsContextProvider = (props) => {
  const [data, setData] = useState([]);
  const [, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [row] = useState(12);
  const [searchEntry, setSearchEntry] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://www.europeana.eu/api/v2/search.json?wskey=${API_KEY} &query=Berlin&query =Kreuzberg&query=Museum FHXB&start=${page}&rows=${row}`
      );
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.log("Catch: ", error);
      setError(error);
    }
  };

  // To fetch all Items for filtering

  // const [entireList, setEntireList] = useState([]);

  // const fetchAllData = async () => {
  //   let totalResults = 2696;
  //   let totalPages = Math.ceil(totalResults / row);
  //   // const [promises, setPromises] = useState([]);
  //   const promises = [];
  //   for (let p = 1; p <= totalPages; p++) {
  //     try {
  //       const response = await fetch(
  //         `https://www.europeana.eu/api/v2/search.json?wskey=${API_KEY}&query=Berlin&query=Kreuzberg&query=Museum+FHXB&start=${page}&rows=${row}&query=${searchEntry}`
  //       );
  //       const result = await response.json();

  //       setEntireList((entireList) => [...entireList, ...result.items]);
  //       // setEntireList((entireList) => [...entireList, ...result.items]);
  //     } catch (error) {
  //       console.log("Catch: ", error);
  //       setError(error);
  //     }
  //   }
  // };

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
