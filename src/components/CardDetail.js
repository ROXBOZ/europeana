import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import GoogleLink from "./GoogleLink";
import { FaSave } from "react-icons/fa";
import { useState } from "react";
import { doc, onSnapshot, updateDoc, deleteField } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { db } from "../config/firebaseConfig";
import { ItemsContext } from "../store/ItemsContext";
import Chat from "./Chat";

const CardDetail = () => {
  const { animate, setAnimate, userSaved, setUserSaved } =
    useContext(ItemsContext);
  // console.log("animate :>> ", animate);
  const { user } = useContext(AuthContext);
  let location = useLocation();
  // console.log("location", location);
  const { id, title, clearTitle, img, provider, description, copyrights } =
    location.state.content;

  const street = clearTitle.split(",")[0];
  const googleMapLink = `https://www.google.com/maps?q=${street}`;

  // what key for firestore next item ?
  // const [newItem, setNewItem] = useState("");
  // const unsub = onSnapshot(doc(db, "saved", user.uid), (doc) => {
  //   let currentData = doc.data();
  //   let currentAmountOfItems = Object.keys(currentData).length;
  //   setNewItem(`item_${currentAmountOfItems + 1}`);
  //   // console.log("newItem :>> ", newItem);
  // });

  const [opacity, setOpacity] = useState(0.5);

  const handleSave = async () => {
    setOpacity(opacity === 1 ? 0.5 : 1);
    setAnimate((prevState) => !prevState);

    // const savedDocRef = doc(db, "saved", user.uid);
    // await updateDoc(savedDocRef, {
    //   [newItem]: id,
    // });

    // if (/* if doesnt exist yet */) {
    //   await updateDoc(savedDocRef, {
    //     [newItem]: id,
    //   });
    // } else {
    //   await updateDoc(savedDocRef, {
    //   [newItem]: deleteField(),
    // });
    // }
  };

  // useEffect(() => {
  //   unsub();
  // }, [setNewItem]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
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
                <button onClick={handleSave} className="card-save">
                  <FaSave className="card-save-icon" style={{ opacity }} />
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
