import React from "react";
import { useContext } from "react";
import { ItemsContext } from "../store/ItemsContext";
import Card from "../components/Card";
import { AuthContext } from "../store/AuthContext";
import Pagination from "../components/Pagination";

const ProtectedRoute = ({ getInput, handleNext, handlePrev, handleSearch }) => {
  const { data } = useContext(ItemsContext);
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
              onChange={getInput}
              className="search-bar"
              type="text"
              placeholder="&nbsp;Suche eine Straße im Kiez..."
            />
            <button onClick={handleSearch}>Suchen</button>
          </div>

          <Pagination handleNext={handleNext} handlePrev={handlePrev} />

          {data.items ? (
            data.items.map((c) => {
              const id = c.id.replace(
                "/2064115/Museu_ProvidedCHO_museum_digital_",
                ""
              );
              console.log("id", id);

              return <Card key={id} c={c} id={id} />;
            })
          ) : (
            <p>...loading (1)...</p>
          )}
          <Pagination handleNext={handleNext} handlePrev={handlePrev} />
          <p className="total-results">
            <strong>{data.totalResults} Ergebnisse</strong>
          </p>
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
