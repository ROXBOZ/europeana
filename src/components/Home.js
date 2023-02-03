import React from "react";
import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";

// Context
import { ItemsContext } from "../store/ItemsContext";
import { AuthContext } from "../store/AuthContext";

// Routes
import ProtectedRoute from "../routes/ProtectedRoute";

const Home = () => {
  const { user, firebaseUsername } = useContext(AuthContext);
  const {
    data,
    NoSearchUrl,
    page,
    row,
    setPage,
    fetchData,
    searchEntry,
    setSearchEntry,
    streetFormat,
    searchUrl,
  } = useContext(ItemsContext);

  // Welcoming Alert

  const [isAlertOpen, setIsAlertOpen] = useState(true);
  const handleClose = () => {
    setIsAlertOpen(false);
  };

  // Search

  useEffect(() => {
    if (searchEntry === "") {
      fetchData(NoSearchUrl);
    } else {
      fetchData(searchUrl);
    }
  }, [page]);

  const getInput = (e) => {
    const formatted = streetFormat(e.target.value);
    console.log("formatted", formatted);
    setSearchEntry(formatted);

    if (e.target.value === "") {
      fetchData(NoSearchUrl);
    }
  };

  const handleSearch = () => {
    fetchData(searchUrl);
    if (searchEntry === "") {
      fetchData(NoSearchUrl);
    } else {
      fetchData(searchUrl);
    }
  };

  // Pagination

  const handleNext = () => {
    setPage(page + row);
    console.log("page", page);
  };
  const handlePrev = () => {
    setPage(page - row);
    console.log("page", page);
  };

  if (data) {
    return (
      <>
        <h1>Berlin SO36 Wohnhäusern Fotosammlung</h1>
        <h2 className="title">Vorwärts in die Vergangenheit</h2>

        {isAlertOpen && (
          <div className="alert">
            {user ? (
              <div className="alert-content">
                <p>
                  Willkommen <strong>{firebaseUsername}</strong>!
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
