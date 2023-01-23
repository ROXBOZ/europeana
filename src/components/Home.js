import React from "react";
import ItemsGrid from "./ItemsGrid";
import { useState } from "react";
import { useEffect } from "react";
import Pagination from "./Pagination";

const Home = () => {
  const [data, setData] = useState([]);
  const [catalog, setCatalog] = useState([]);
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
        console.log(result);
        setCatalog(result.items);
        setFilteredItems(result.items);
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

  const [searchEntry, setSearchEntry] = useState("");

  const filtering = () => {
    let filter = catalog.filter((e) => {
      return e.dcTitleLangAware.de[0].includes(searchEntry);
    });
    setFilteredItems(filter);
  };

  const [filteredItems, setFilteredItems] = useState([]);

  const getInput = (e) => {
    e.preventDefault();
    console.log("typing", e.target.value);
    setSearchEntry(e.target.value);
  };

  useEffect(() => {
    filtering();
  }, [searchEntry]);

  console.log("filtereditems", filteredItems);

  return (
    <div>
      <h1>Set a H1</h1>
      <h2>Friedrichshain-Kreuzberg?</h2>
      <p>
        Du kannst einfach das Gebäude finden, in dem du wohnst. Durchsuche die
        Sammlung und entdecke historische Aufnahmen von Gebäuden in
        Kreuzberg-Friedrichshain. Mach jetzt die Suche und finde dein Zuhause!
      </p>

      <div className="search-container">
        <input
          value={searchEntry}
          id="search"
          onChange={getInput}
          className="search-bar"
          type="text"
          placeholder="Suche eine Straße..."
        />
      </div>

      <Pagination
        page={page}
        handleNext={handleNext}
        handlePrev={handlePrev}
        result={result}
      />

      <p className="small">
        <strong>{result}</strong> Ergebnisse von <a href="">FHXB Museum</a> bei{" "}
        <a href="">Europana Search API</a>.{" "}
      </p>

      <ItemsGrid catalog={filteredItems} searchEntry={searchEntry} />
    </div>
  );
};

export default Home;
