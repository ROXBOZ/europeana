import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const CardDetail = () => {
  let location = useLocation();
  console.log("location", location);
  const { title, clearTitle, img, provider, description, copyrights } =
    location.state.content;

  const street = clearTitle.split(",")[0];
  const googleMapLink = `https://www.google.com/maps?q=${street}`;

  return (
    <>
      {true ? (
        <div className="card-content">
          <h3 className="data-title">{title}</h3>
          <img className="card-img" src={img} alt={clearTitle} />
          <p className="data-description">{description}.</p>
          <p className="data-google-link">
            <a href={googleMapLink} target="_blank" rel="noopener noreferrer">
              <button>auf Google Map</button>
            </a>
          </p>
          <div className="data-caption">
            <span>
              ©&nbsp;
              <a href={copyrights} className="data-provider">
                {provider}
              </a>
            </span>
          </div>
        </div>
      ) : (
        <p>...loading (3) ...</p>
      )}
    </>
  );
};

export default CardDetail;
