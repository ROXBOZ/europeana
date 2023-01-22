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
          `https://www.europeana.eu/api/v2/search.json?wskey=abastende &query=Berlin&query =Kreuzberg&query=Museum FHXB&start=${page}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log("Catch: ", error);
        setError(error);
      }
    };
    fetchData();
  }, [page]);

  const result = data.totalResults;
  const itemsCount = data.itemsCount;

  const handleNext = () => {
    setPage(page + itemsCount);
  };
  const handlePrev = () => {
    setPage(page - itemsCount);
  };

  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas illo
        debitis numquam maxime fuga quam molestias accusamus quae eaque
        consequuntur. Ut illum delectus saepe placeat eum labore veritatis
        maiores illo.
      </p>

      <div className="pagination-button-container">
        <button
          className="pagination-button"
          disabled={page === 1 ? true : false}
          onClick={handlePrev}
        >
          ←&nbsp;vor
        </button>
        <button
          className="pagination-button"
          disabled={page >= result ? true : false}
          onClick={handleNext}
        >
          nächste&nbsp;→
        </button>
      </div>
      <p className="ergebnis-info">Ergebnisse: {result} </p>
      <ItemsGrid data={data} />
    </div>
  );
};

export default Home;
