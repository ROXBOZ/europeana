import React from "react";
import { useContext } from "react";
import { ItemsContext } from "../store/ItemsContext";
import Card from "../components/Card";
import { AuthContext } from "../store/AuthContext";
import { Link } from "react-router-dom";
import useIsAuth from "../hooks/useIsAuth";

const ProtectedRoute = ({ getInput, handleNext, handlePrev }) => {
  const { data, page, loading, searchEntry } = useContext(ItemsContext);
  const { user } = useContext(AuthContext);
  // const isUser = isAuth(user);
  // const isUser = useIsAuth();

  return (
    <>
      {user ? (
        <>
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
        </>
      ) : (
        <p>
          Bitte <Link to="register">anmelden</Link> oder{" "}
          <Link to="login">einloggen</Link>, um auf die Daten entdecken.{" "}
        </p>
      )}
    </>
  );
};

export default ProtectedRoute;
