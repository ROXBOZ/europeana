import React, { useState, useContext, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { AuthContext } from "../store/AuthContext";
import { ItemsContext } from "../store/ItemsContext";
import Card from "./Card";

const Konto = () => {
  const { firebaseUsername } = useContext(AuthContext);
  const { userSaved } = useContext(ItemsContext);

  // 4. make sure CARDS appear
  // 5. allow user to delete Card

  return (
    <>
      <h1>Mein Konto</h1>
      <h2>Konto von {firebaseUsername}</h2>
      <p>
        Auf dieser Seite hast du die Möglichkeit, die Bilder anzusehen, die du
        gespeichert hast. Sie sind alle hier zusammengefasst, damit du einfach
        und bequem darauf zugreifen kannst.
      </p>
      <h3>Geschpeichert</h3>

      {userSaved &&
        userSaved.map((s) => {
          return (
            <>
              {/* <Card key={doc.id} c={s} id={doc.id} /> */}
              <p>{s}</p>
            </>
          );
        })}
    </>
  );
};

export default Konto;
