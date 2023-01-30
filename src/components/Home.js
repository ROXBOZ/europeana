import React from "react";
import { useEffect } from "react";
import { ItemsContext } from "../store/ItemsContext";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import ProtectedRoute from "../routes/ProtectedRoute";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const {
    data,
    NoSearchUrl,
    page,
    setPage,
    fetchData,
    searchEntry,
    setSearchEntry,
    streetFormat,
    searchUrl,
  } = useContext(ItemsContext);
  const { user, userName } = useContext(AuthContext);

  // Welcoming Alert

  const [isAlertOpen, setIsAlertOpen] = useState(true);
  const handleClose = () => {
    setIsAlertOpen(false);
  };

  // Search

  useEffect(() => {
    fetchData(NoSearchUrl);
  }, [page]);

  // WHY CONTENT DISAPPEAR WHEN ADDING INPUT ???

  const getInput = (e) => {
    setSearchEntry(e.target.value);
  };

  const handleSearch = () => {
    // streetFormat(searchEntry);
    fetchData(searchUrl);
  };

  // Pagination

  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePrev = () => {
    setPage(page - 1);
  };

  if (data) {
    return (
      <>
        <h1>Berlin SO36 Wohnhäusern Fotosammlung</h1>
        <h2 className="title">
          Vorwärts
          <br />
          in die Vergangenheit
        </h2>

        {isAlertOpen && (
          <div className="alert">
            {user ? (
              <div className="alert-content">
                <p>
                  Willkommen <strong>{userName}</strong>
                </p>
                <span className="alert-close" onClick={handleClose}>
                  &times;
                </span>
              </div>
            ) : (
              <div className="alert-content">
                <p>
                  <Link to="register">Registrieren</Link> /{" "}
                  <Link to="login">Anmelden</Link>, um die Daten zu entdecken.
                </p>
              </div>
            )}
          </div>
        )}

        <ProtectedRoute
          handleSearch={handleSearch}
          getInput={getInput}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </>
    );
  }
};

export default Home;
