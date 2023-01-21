import React from "react";
import ItemsGrid from "./ItemsGrid";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.europeana.eu/api/v2/search.json?wskey=abastende &query=Berlin&query =Kreuzberg&query=Museum FHXB&start=${page}&row=1000`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log("Catch: ", error);
        setError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <ItemsGrid data={data} />
    </div>
  );
};

export default Home;
