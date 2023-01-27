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
    page,
    loading,
    setPage,
    // entireList,
    searchEntry,
    setSearchEntry,
    fetchData,
    // fetchAllData,
  } = useContext(ItemsContext);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, [page]);

  // useEffect(() => {
  //   cleanup();
  //   fetchAllData();
  // }, [page]);

  // console.log("entireList", entireList);

  const getInput = (e) => {
    setSearchEntry(e.target.value);
  };

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
        <h2>Vorwärts in die Vergangenheit</h2>

        {isModalOpen && (
          <div className="salutation">
            {user ? (
              <div className="salutation-content">
                <p>
                  Willkomen <strong>{user.email}</strong>
                </p>
                <span className="salutation-close" onClick={handleClose}>
                  &times;
                </span>
              </div>
            ) : (
              <div className="salutation-content">
                <p>
                  Bitte <Link to="register">registrieren</Link> oder{" "}
                  <Link to="login">sich anmelden</Link>, um auf die Daten zu
                  entdecken.{" "}
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
