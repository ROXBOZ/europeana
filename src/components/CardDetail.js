import React from "react";
import { useLocation } from "react-router-dom";
import GoogleLink from "./GoogleLink";
import { FaSave } from "react-icons/fa";
import { useState } from "react";

const CardDetail = () => {
  let location = useLocation();
  console.log("location", location);
  const { title, clearTitle, img, provider, description, copyrights } =
    location.state.content;

  const street = clearTitle.split(",")[0];
  const googleMapLink = `https://www.google.com/maps?q=${street}`;

  const [opacity, setOpacity] = useState(0.5);
  const handleSpeichern = () => {
    setOpacity(opacity === 1 ? 0.5 : 1);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    if (isModalOpen === true) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {true ? (
        <div className="card-content">
          <h3 className="data-title">{title}</h3>
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
                <button onClick={handleSpeichern} className="card-save">
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
        </div>
      ) : (
        <p>...loading (3) ...</p>
      )}
    </>
  );
};

export default CardDetail;
