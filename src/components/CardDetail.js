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
    console.log("yolo :>> ");
    setOpacity(opacity === 1 ? 0.5 : 1);
  };

  return (
    <>
      {true ? (
        <div className="card-content">
          <h3 className="data-title">{title}</h3>
          <div className="card-main-content">
            <img className="card-img" src={img} alt={clearTitle} />
            <div className="card-main-content-texts">
              <p className="data-description">{description}.</p>
              <div className="card-content-button-container">
                <GoogleLink title={title} googleMapLink={googleMapLink} />
                <button onClick={handleSpeichern} className="card-like">
                  <FaSave className="card-like-icon" style={{ opacity }} />
                  &nbsp; Speichern
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
