import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h2>Seite nicht gefunden</h2>
      <p>
        Etwas ging schief. Zurück zu <Link to="/">Startseite</Link>.
      </p>
    </div>
  );
};

export default NotFound;
