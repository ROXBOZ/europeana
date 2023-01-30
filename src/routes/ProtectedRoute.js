import React from "react";
import { useContext } from "react";
import { ItemsContext } from "../store/ItemsContext";
import Card from "../components/Card";
import { AuthContext } from "../store/AuthContext";

const ProtectedRoute = ({ getInput, handleNext, handlePrev, handleSearch }) => {
  const { data, page, searchEntry } = useContext(ItemsContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && (
        <>
          <p>
            <strong>SO36</strong> - das ist die alte Postleitzahl von Kreuzberg
            und der Name des berühmten Clubs, der in den 80er Jahren die
            Underground-Szene Berlins geprägt hat. Das{" "}
            <a href="https://www.fhxb-museum.de/">FHXB Museum</a> hat eine
            Sammlung von Fotos von Wohnhäusern aus dieser Zeit ergattert, die
            zeigen, wie die Straßen in SO36 damals ausgesehen haben.
          </p>
          <div className="search-container">
            <input
              // value={searchEntry}
              onChange={getInput}
              className="search-bar"
              type="text"
              placeholder="&nbsp;Suche eine Straße im Kiez..."
            />
            <button onClick={handleSearch}>Suchen</button>
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
                return (
                  <>
                    <Card key={c.id} c={c} />
                  </>
                );
              })
          ) : (
            <p>...loading (1)...</p>
          )}
          <p className="total-results">
            <strong>{data.totalResults} Ergebnisse</strong>
          </p>
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
