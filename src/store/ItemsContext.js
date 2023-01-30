import { createContext, useContext, useState } from "react";
import { API_KEY } from "../config/apiKey";

export const ItemsContext = createContext();

export const ItemsContextProvider = (props) => {
  const [page, setPage] = useState(1);
  const [row] = useState(6);
  const [data, setData] = useState({});
  const [, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchEntry, setSearchEntry] = useState(""); // what is inputted
  const [url, setUrl] = useState(
    `https://www.europeana.eu/api/v2/search.json?wskey=${API_KEY}&query=Berlin&query =Kreuzberg&query=Museum FHXB&start=${page}&rows=${row}`
  );

  // const strasseFormat = (strasse) => {
  //   if (strasse && strasse.includes("strasse")) {
  //     strasse.replace("strasse", "str");
  //   } else if (strasse && strasse.includes("straße")) {
  //     strasse.replace("straße", "str");
  //   }
  //   return strasse;
  // };
  // strasseFormat(searchEntry);

  // console.log("searchEntry :>> ", searchEntry);

  // prepare it for fetching

  // const search = searchEntry ? `&query=${searchEntry}` : null;

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

  const getInput = (e) => {
    setSearchEntry(e.target.value);
    setUrl(
      `https://www.europeana.eu/api/v2/search.json?wskey=${API_KEY}&query=Berlin&query =Kreuzberg&query=Museum FHXB&query=${searchEntry}&start=${page}&rows=${row}`
    );
  };

  return (
    <ItemsContext.Provider
      value={{
        data,
        page,
        loading,
        searchEntry,
        getInput,
        setSearchEntry,
        setPage,
        fetchData,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
};
