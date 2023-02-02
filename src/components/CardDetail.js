import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import GoogleLink from "./GoogleLink";
import { FaSave } from "react-icons/fa";
import { useState } from "react";
import {
  doc,
  onSnapshot,
  updateDoc,
  deleteField,
  collection,
  addDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { db } from "../config/firebaseConfig";
import { ItemsContext } from "../store/ItemsContext";
import Chat from "./Chat";

const CardDetail = () => {
  const { userSaved, setUserSaved } = useContext(ItemsContext);
  const { user } = useContext(AuthContext);
  let location = useLocation();
  const { id, title, clearTitle, img, provider, description, copyrights } =
    location.state.content;

  const street = clearTitle.split(",")[0];
  const googleMapLink = `https://www.google.com/maps?q=${street}`;

  const [opacity, setOpacity] = useState(0.5);
  const [isSaved, setIsSaved] = useState("");

  const handleSave = async () => {
    setIsSaved(true);
    const savedItemRef = doc(db, "saved", user.uid);
    console.log("saving :>> ");
    await updateDoc(savedItemRef, {
      savedItems: arrayUnion(id),
    });
  };

  const handleUnsave = async () => {
    setIsSaved(false);
    const savedItemRef = doc(db, "saved", user.uid);
    console.log("unsaving");
    await updateDoc(savedItemRef, {
      savedItems: arrayRemove(id),
    });
  };

  const toggleSave = () => {
    if (isSaved) {
      handleUnsave();
    } else {
      handleSave();
    }
    // refresh the konto component
  };

  ///

  // is the item already saved, then the saved button should display opacity accordingly.

  ///

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    if (window.innerWidth > 600) {
      setIsModalOpen(!isModalOpen);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".modal-content")) {
        return;
      }
      setIsModalOpen(false);
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <>
      {true ? (
        <div className="card-content">
          <h1 className="data-title">{title}</h1>
          <h2 className="data-title">{clearTitle}</h2>
          <div className="card-main-content">
            <img
              className="card-img"
              src={img}
              alt={clearTitle}
              onClick={toggleModal}
            />
            {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <span onClick={toggleModal} className="close-modal">
                    &times; schließen
                  </span>
                  <figure>
                    <img className="img-modal" src={img} alt={clearTitle} />
                    <figcaption>{clearTitle}</figcaption>
                  </figure>
                </div>
              </div>
            )}
            <div className="card-main-content-texts">
              <p className="data-description">{description}.</p>
              <div className="card-content-button-container">
                <GoogleLink title={title} googleMapLink={googleMapLink} />

                <button onClick={toggleSave} className="card-save">
                  <FaSave
                    className="card-save-icon"
                    style={{ opacity: isSaved ? 1 : 0.5 }}
                  />
                  &nbsp; speichern
                </button>
              </div>
              <span className="data-copyrights">
                ©&nbsp;
                <a href={copyrights} className="data-provider">
                  {provider}
                </a>
              </span>
            </div>
          </div>
          <div className="data-caption"></div>
          <Chat id={id} />
        </div>
      ) : (
        <p>...loading (3) ...</p>
      )}
    </>
  );
};

export default CardDetail;
