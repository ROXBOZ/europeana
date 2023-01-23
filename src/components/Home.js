import React from "react";
import ItemsGrid from "./ItemsGrid";
import { useState } from "react";
import { useEffect } from "react";
import Pagination from "./Pagination";
// import Search from "./Search";

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
        setCatalog(result.items);
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
  const getInput = (e) => {
    setSearchEntry(e.target.value);
    console.log("asdasdasdasda");
    filtering();
    // console.log("e.target.value", e.target.value);
  };
  const filtering = () => {
    console.log("searcjEntry", searchEntry);
    let filteredItems = catalog.filter((e) => {
      console.log("e.dcTitleLangAware.de[0] :>> ", e.dcTitleLangAware.de[0]);
      return e.dcTitleLangAware.de[0].includes(searchEntry);
    });
    console.log("filteredItems :>> ", filteredItems);
  };

  return (
    <div>
      <h1>Set a H1</h1>
      <h2>Friedrichshain-Kreuzberg?</h2>
      <p>
        Du kannst einfach das Gebäude finden, in dem du wohnst. Durchsuche die
        Sammlung und entdecke historische Aufnahmen von Gebäuden in
        Kreuzberg-Friedrichshain. Mach jetzt die Suche und finde dein Zuhause!
      </p>

      <hr />
      <div className="search-container">
        {/* <input
          value={searchEntry}
          id="search"
          onChange={getInput}
          className="search-bar"
          type="text"
          placeholder="Waldermarstr.."
        /> */}

        <label className="search-bar-label" for="search">
          &nbsp;Suche eine Straße
        </label>
      </div>
      <hr />

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

      <hr />

      {/* <ItemsGrid catalog={catalog} searchEntry={searchEntry} /> */}
      <ItemsGrid catalog={catalog} searchEntry={searchEntry} />
    </div>
  );
};

export default Home;
