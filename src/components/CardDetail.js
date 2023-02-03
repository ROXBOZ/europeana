import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { FaSave } from "react-icons/fa";

// Components
import GoogleLink from "./GoogleLink";
import Chat from "./Chat";

//Firebase
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

// Context
import { AuthContext } from "../store/AuthContext";

const CardDetail = () => {
  let location = useLocation();
  const { user } = useContext(AuthContext);
  const { id, title, clearTitle, img, provider, description, copyrights } =
    location.state.content;
  const street = clearTitle.split(",")[0];
  const googleMapLink = `https://www.google.com/maps?q=${street}`;
  const [, setOpacity] = useState(0.5);
  const [isSaved, setIsSaved] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // save to firebase
  const handleSave = async () => {
    setIsSaved(true);
    const savedItemRef = doc(db, "saved", user.uid);
    await updateDoc(savedItemRef, {
      savedItems: arrayUnion(id),
    });
  };

  // delete from firebase
  const handleUnsave = async () => {
    setIsSaved(false);
    const savedItemRef = doc(db, "saved", user.uid);
    await updateDoc(savedItemRef, {
      savedItems: arrayRemove(id),
    });
  };

  // toggle between save and unsave
  const toggleSave = () => {
    if (isSaved) {
      setOpacity(1);
      handleUnsave();
    } else {
      setOpacity(0.5);
      handleSave();
    }
  };

  // Disable modal on mobile screen
  const toggleModal = () => {
    if (window.innerWidth > 600) {
      setIsModalOpen(!isModalOpen);
    }
  };

  // Quitting modal with outside click
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
