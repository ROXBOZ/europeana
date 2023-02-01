import { collection, getDocs, query } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { API_KEY } from "../config/apiKey";
import { db } from "../config/firebaseConfig";
import { useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const ItemsContext = createContext();
export const ItemsContextProvider = (props) => {
  const [page, setPage] = useState(1);
  const [row] = useState(6);
  const [data, setData] = useState({});
  const [, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchEntry, setSearchEntry] = useState("");
  const { user } = useContext(AuthContext);
  const streetFormat = (input) => {
    if (input && input.includes("strasse")) {
      return input.replace("strasse", "str");
    } else if (input && input.includes("straße")) {
      return input.replace("straße", "str");
    }
    return input;
  };

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

  const [animate, setAnimate] = useState(true);
  const [userSaved, setUserSaved] = useState([]);

  const getSavedItems = async () => {
    const q = query(collection(db, "saved"));
    const querySnapshot = await getDocs(q);
    const savedItemsArray = [];
    querySnapshot.forEach((doc) => {
      if (user.uid === doc.id) {
        const savedItems = doc.data().savedItems;
        savedItems.forEach((item) => {
          savedItemsArray.push(item);
        });
      }
    });
    setUserSaved(savedItemsArray);
  };

  useEffect(() => {
    if (user?.uid) {
      getSavedItems();
    }
  }, [user]);

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
        animate,
        setAnimate,
        userSaved,
        setUserSaved,
        setSearchEntry,
        setPage,
        fetchData,
        streetFormat,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
};
