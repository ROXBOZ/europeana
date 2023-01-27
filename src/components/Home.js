import React from "react";
import { useEffect } from "react";
import { ItemsContext } from "../store/ItemsContext";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import ProtectedRoute from "../routes/ProtectedRoute";
import { Link } from "react-router-dom";

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

  if (data) {
    return (
      <div>
        <h1>Berlin SO36 Wohnhäusern Fotosammlung</h1>
        <h2>Vorwärts in die Vergangenheit</h2>
        <p className="salutation">
          {user ? (
            `Willkomen ${user.email}`
          ) : (
            <p className="no-loggin-no-data">
              Bitte <Link to="register">anmelden</Link> oder{" "}
              <Link to="login">einloggen</Link>, um auf die Daten zu entdecken.{" "}
            </p>
          )}
        </p>
        <p>
          SO36 - das ist die alte Postleitzahl von Kreuzberg und der Name des
          berühmten Clubs, der in den 80er Jahren die Underground-Szene Berlins
          geprägt hat. Das FHXB Museum hat eine Sammlung von Fotos von
          Wohnhäusern aus dieser Zeit ergattert, die zeigen, wie die Straßen in
          SO36 damals ausgesehen haben.
        </p>

        <ProtectedRoute
          getInput={getInput}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>
    );
  }
};

export default Home;
