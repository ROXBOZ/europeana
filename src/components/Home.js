import React from "react";
import { useEffect } from "react";
import { ItemsContext } from "../store/ItemsContext";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import ProtectedRoute from "../routes/ProtectedRoute";
import { Link } from "react-router-dom";
import { useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

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
  const { user } = useContext(AuthContext);
  const [firebaseUsername, setFirebaseUsername] = useState([]);

  // Welcoming Alert

  const [isAlertOpen, setIsAlertOpen] = useState(true);
  const handleClose = () => {
    setIsAlertOpen(false);
  };

  const getFirebaseUser = async () => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.id === user.uid) {
        setFirebaseUsername(doc.data().username);
      }
    });
  };

  useEffect(() => {
    if (user?.uid) {
      getFirebaseUser();
    }
  }, [user]);

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
                <p>Willkommen {firebaseUsername}</p>
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
