import React from "react";
import { useEffect } from "react";
import { ItemsContext } from "../store/ItemsContext";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import ProtectedRoute from "../routes/ProtectedRoute";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const { data, page, setPage, searchEntry, getInput, fetchData } =
    useContext(ItemsContext);

  const { user, userName } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, [page, searchEntry]);

  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePrev = () => {
    setPage(page - 1);
  };

  const [isModalOpen, setIsModalOpen] = useState(true);
  const handleClose = () => {
    setIsModalOpen(false);
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

        {isModalOpen && (
          <div className="alert">
            {user ? (
              <div className="alert-content">
                <p>
                  Willkommen <strong>{userName}</strong>
                  {/* Willkomen <strong>{user.email}</strong> */}
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
          getInput={getInput}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </>
    );
  }
};

export default Home;
