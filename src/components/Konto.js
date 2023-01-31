import React from "react";
import { Link } from "react-router-dom";

const Konto = () => {
  return (
    <>
      <h1>Mein Konto</h1>
      <h2>Mein Konto</h2>
      <Link to="/chat">
        ↗&nbsp;<a>Guestbook</a>
      </Link>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores porro
        optio officia, a id sapiente voluptates nihil accusantium, reiciendis
        vel facilis provident similique quibusdam sed? Quidem provident impedit
        excepturi autem!
      </p>
      <h3>Geschpeichert</h3>
    </>
  );
};

export default Konto;
