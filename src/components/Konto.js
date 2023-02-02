import React, { useState, useContext, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { AuthContext } from "../store/AuthContext";
import { ItemsContext } from "../store/ItemsContext";
import Card from "./Card";

const Konto = () => {
  const { firebaseUsername } = useContext(AuthContext);
  const { id, userSaved } = useContext(ItemsContext);

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
        userSaved.map((c) => {
          return (
            <>
              <p>{c}</p>
            </>
          );
        })}

      {/* /* console.log("c", c); // on KONTO, c = item id // on PROTECTED ROUTE, c
      = object of API */}

      {/* {data.items ? (
        data.items.map((c) => {
          if (userSaved) {
            userSaved.map((c) => {
              if (c === id) {
                <>
                  <Card c={c} />
                  <p>{c}</p>
                </>;
              }
            });
          }
        })
      ) : (
        <p>No data found</p>
      )} */}
    </>
  );
};

export default Konto;
