import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebaseConfig";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { AuthContext } from "../store/AuthContext";
import { ItemsContext } from "../store/ItemsContext";
import Card from "./Card";

const Konto = () => {
  const { user } = useContext(AuthContext);
  const { userSaved, setUserSaved } = useContext(ItemsContext);

  // 1. make sure liked item added manually in database appear here
  // 2. make sure there are no duplicates
  // 3. make speichern button add/delete on toggle (check comments on CardDetail)
  // 4. On Konto, make sure CARDS appear
  // 5. allow user to delete Card

  return (
    <>
      <h1>Mein Konto</h1>
      <h2>Mein Konto</h2>
      <>Liebe* {firebaseUsername}</>
      <p>
        Auf dieser Seite hast du die Möglichkeit, die Bilder anzusehen, die du
        gespeichert hast. Sie sind alle hier zusammengefasst, damit du einfach
        und bequem darauf zugreifen kannst.
      </p>
      <h3>Geschpeichert</h3>
      {userSaved &&
        userSaved.map((d) => {
          return (
            <>
              <p>{d}</p>
              {/* <Card c={d} key={d.id} /> */}
            </>
          );
        })}
    </>
  );
};

export default Konto;

// AllItems.map((d) => {
//   return (
//     <>
//       {/* <p>{d}</p> */}

//       <Card c={d} key={d.id} />
//     </>
//   );
// })
