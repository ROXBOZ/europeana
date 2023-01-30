import React from "react";
import { FaStreetView } from "react-icons/fa";

const GoogleLink = ({ title, googleMapLink }) => {
  if (title.includes("Fotografie: ")) {
    return (
      <a
        className="data-google-link"
        href={googleMapLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaStreetView />
        &nbsp;<strong>Google Street</strong>
      </a>
    );
  }
};

export default GoogleLink;
