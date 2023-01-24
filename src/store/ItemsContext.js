import { createContext, useState } from "react";
import { API_KEY } from "./config";

export const ItemsContext = createContext();

export const ItemsContextProvider = (props) => {
  const [data, setData] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [, setError] = useState(null);
  const [page, setPage] = useState(1);
  let row = 3;
  const [filteredItems, setFilteredItems] = useState([]);
  const totalResult = data.totalResults;

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://www.europeana.eu/api/v2/search.json?wskey=${API_KEY} &query=Berlin&query =Kreuzberg&query=Museum FHXB&start=${page}&rows=${row}`
      );
      const result = await response.json();
      setData(result);
      console.log("result fetch", result);
      setCatalog(result.items);
      setFilteredItems(result.items);
    } catch (error) {
      console.log("Catch: ", error);
      setError(error);
    }
  };

  return (
    <ItemsContext.Provider
      value={{
        data,
        page,
        setPage,
        catalog,
        filteredItems,
        totalResult,
        fetchData,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
};
