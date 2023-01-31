import { createContext, useState } from "react";
import { API_KEY } from "../config/apiKey";

export const ItemsContext = createContext();
export const ItemsContextProvider = (props) => {
  const [page, setPage] = useState(1);
  const [row] = useState(6);
  const [data, setData] = useState({});
  const [, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchEntry, setSearchEntry] = useState("");

  // const streetFormat = (input) => {
  //   if (input && input.includes("strasse")) {
  //     setSearchEntry = input.replace("strasse", "str");
  //   } else if (input && input.includes("straße")) {
  //     setSearchEntry = input.replace("straße", "str");
  //   }
  //   return input;
  // };
  // streetFormat(searchEntry);

  const baseUrl = `https://www.europeana.eu/api/v2/search.json?wskey=${API_KEY}&query=Berlin&query =Kreuzberg&query=Museum FHXB`;
  const NoSearchUrl = `${baseUrl}&start=${page}&rows=${row}`;
  const searchUrl = `${baseUrl}&query=${searchEntry}&start=${page}&rows=${row}`;

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      // console.log("result :>> ", result);
      setLoading(false);
    } catch (error) {
      console.log("Catch: ", error);
      setError(error);
    }
  };

  return (
    <ItemsContext.Provider
      value={{
        data,
        NoSearchUrl,
        searchUrl,
        page,
        row,
        loading,
        searchEntry,
        setSearchEntry,
        setPage,
        fetchData,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
};
