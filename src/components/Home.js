import React from "react";
import ItemsGrid from "./ItemsGrid";
import { useState } from "react";
import { useEffect } from "react";
import { ItemsContext } from "../store/ItemsContext";
import { useContext } from "react";

const Home = () => {
  const { data, page, setPage, catalog, fetchData } = useContext(ItemsContext);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchEntry, setSearchEntry] = useState("");

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (data) {
      let filter = catalog.filter((e) => {
        return e.dcTitleLangAware.de[0].toLowerCase().includes(searchEntry);
      });
      setFilteredItems(filter);
    }
  }, [searchEntry, catalog, data]);

  const getInput = (e) => {
    setSearchEntry(e.target.value.toLowerCase());
  };

  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePrev = () => {
    setPage(page - 1);
  };

  if (data) {
    return (
      <div>
        <h1>Berlin SO36 Wohnhäusern Fotosammlung</h1>
        <h2>Vorwärts in die Vergangenheit</h2>
        <p>
          SO36 - das ist die alte Postleitzahl von Kreuzberg und der Name des
          berühmten Clubs, der in den 80er Jahren die Underground-Szene Berlins
          geprägt hat. Das FHXB Museum hat eine Sammlung von Fotos von
          Wohnhäusern aus dieser Zeit ergattert, die zeigen, wie die Straßen in
          SO36 damals ausgesehen haben.
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

        <div className="pagination-button-container">
          <button
            className="pagination-button"
            disabled={page === 1 ? true : false}
            onClick={handlePrev}
          >
            ←&nbsp;vor
          </button>
          <button className="pagination-button" onClick={handleNext}>
            nächste&nbsp;→
          </button>
        </div>

        <ItemsGrid catalog={filteredItems} searchEntry={searchEntry} />
        <p className="small">
          <strong>{data.totalResults}</strong> Ergebnisse von{" "}
          <a href="">FHXB Museum</a> bei <a href="">Europana Search API</a>.
        </p>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Home;
