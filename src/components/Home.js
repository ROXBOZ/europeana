import React from "react";
import ItemsGrid from "./ItemsGrid";
import { useState } from "react";
import { useEffect } from "react";
import { ItemsContext } from "../store/ItemsContext";
import { useContext } from "react";
import Card from "./Card";

const Home = () => {
  const { data, page, setPage, catalog, fetchData } = useContext(ItemsContext);
  const [searchEntry, setSearchEntry] = useState("");

  useEffect(() => {
    fetchData();
  }, [page]);

  const getInput = (e) => {
    setSearchEntry(e.target.value);
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

        {data.items ? (
          data.items
            .filter((item) => {
              return (
                item.dcTitleLangAware.de[0]
                  .toLowerCase()
                  .includes(searchEntry.toLowerCase()) || !searchEntry
              );
            })
            .map((c) => {
              return <Card key={c.id} c={c} />;
            })
        ) : (
          <p>...loading (1)...</p>
        )}
        <p className="small">
          <strong>{data.totalResults}</strong> Ergebnisse von{" "}
          <a href="">FHXB Museum</a> bei <a href="">Europana Search API</a>.
        </p>
      </div>
    );
  }
};

export default Home;
