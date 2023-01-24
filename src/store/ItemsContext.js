import { createContext, useState } from "react";
import { API_KEY } from "./config";

export const ItemsContext = createContext();

export const ItemsContextProvider = (props) => {
  const [data, setData] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [row] = useState(12);
  const [filteredItems, setFilteredItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://www.europeana.eu/api/v2/search.json?wskey=${API_KEY} &query=Berlin&query =Kreuzberg&query=Museum FHXB&start=${page}&rows=${row}`
      );
      const result = await response.json();
      setData(result);
      setCatalog(result.items);
      setFilteredItems(result.items);
    } catch (error) {
      console.log("Catch: ", error);
      setError(error);
    }
  };

  // To fetch all Items

  //   const AllItems = () => {
  //     let totalResult = 2696; // NOT HARD CODED PLEASE
  //     let totalPages = Math.ceil(totalResult / row);
  //     for (let i = 1; i <= totalPages; i++) {}
  //   };

  return (
    <ItemsContext.Provider
      value={{
        data,
        page,
        setPage,
        catalog,
        filteredItems,
        fetchData,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
};
