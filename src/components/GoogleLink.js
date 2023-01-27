import React from "react";

const GoogleLink = ({ title, googleMapLink }) => {
  if (title.includes("Fotografie: ")) {
    return (
      <p className="data-google-link">
        <a href={googleMapLink} target="_blank" rel="noopener noreferrer">
          <button className="google-button">Zurück in die Zukunft</button>
        </a>
      </p>
    );
  }
};

export default GoogleLink;
