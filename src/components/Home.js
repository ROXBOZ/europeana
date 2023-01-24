import React from "react";
import ItemsGrid from "./ItemsGrid";
import { useState } from "react";
import { useEffect } from "react";
import Pagination from "./Pagination";
import { API_KEY } from "./config";

const Home = () => {
  const [data, setData] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [, setError] = useState(null);
  const [page, setPage] = useState(1);
  const row = 3;
  const totalResult = data.totalResults;
  const amountPage = totalResult / row;
  // console.log("amountPage", amountPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.europeana.eu/api/v2/search.json?wskey=${API_KEY} &query=Berlin&query =Kreuzberg&query=Museum FHXB&start=${page}&rows=${row}`
        );
        const result = await response.json();
        setData(result);
        // console.log(result);
        setCatalog(result.items);
        setFilteredItems(result.items);
      } catch (error) {
        console.log("Catch: ", error);
        setError(error);
      }
    };
    fetchData();
  }, [page]);

  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePrev = () => {
    setPage(page - 1);
  };
  /////////////////////////////////////////////////// FILTERS

  const [searchEntry, setSearchEntry] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const filtering = () => {
    let filter = catalog.filter((e) => {
      return e.dcTitleLangAware.de[0].toLowerCase().includes(searchEntry);
    });
    setFilteredItems(filter);
  };

  const getInput = (e) => {
    // if (e.target.value.includes("strasse" || "straße" || "str.")) {
    //   e.target.value = e.target.value.replace("strasse" | "straße", "str");
    //   console.log("e.target.value", e.target.value);
    // }

    setSearchEntry(e.target.value.toLowerCase());
  };

  useEffect(() => {
    filtering();
  }, [searchEntry]);

  ///////////////////////////////////////////////////
  return (
    <div>
      <h1>Berlin SO36 Wohnhäusern Fotosammlung</h1>
      <h2>Vorwärts in die Vergangenheit</h2>
      <p>
        SO36 - das ist die alte Postleitzahl von Kreuzberg und der Name des
        berühmten Clubs, der in den 80er Jahren die Underground-Szene Berlins
        geprägt hat. Das FHXB Museum hat eine Sammlung von Fotos von Wohnhäusern
        aus dieser Zeit ergattert, die zeigen, wie die Straßen in SO36 damals
        ausgesehen haben. Schau doch mal vorbei!
      </p>

      <div className="search-container">
        <input
          value={searchEntry}
          id="search"
          onChange={getInput}
          className="search-bar"
          type="text"
          placeholder="Suche eine Straße im Kiez..."
        />
      </div>

      <Pagination
        page={page}
        handleNext={handleNext}
        handlePrev={handlePrev}
        totalResult={totalResult}
      />

      <ItemsGrid catalog={filteredItems} searchEntry={searchEntry} />
      <p className="small">
        <strong>{totalResult}</strong> Ergebnisse von <a href="">FHXB Museum</a>{" "}
        bei <a href="">Europana Search API</a>.
      </p>
    </div>
  );
};

export default Home;
