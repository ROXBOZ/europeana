import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebaseConfig";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { AuthContext } from "../store/AuthContext";
import { ItemsContext } from "../store/ItemsContext";

const Konto = () => {
  // const { data } = useContext(ItemsContext);
  const { user } = useContext(AuthContext);
  const [userSaved, setUserSaved] = useState([]);

  const getSavedItems = async () => {
    const q = query(collection(db, "saved"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id === user.uid) {
        setUserSaved(doc.data().item);
        console.log("HERE userSaved : ", userSaved);
      }
    });
  };

  useEffect(() => {
    if (user?.uid) {
      getSavedItems();
    }
  }, [user]);

  return (
    <>
      <h1>Mein Konto</h1>
      <h2>Mein Konto</h2>
      <p>
        <Link to="/chat">
          ↗&nbsp;<a>Guestbook</a>
        </Link>
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores porro
        optio officia, a id sapiente voluptates nihil accusantium, reiciendis
        vel facilis provident similique quibusdam sed? Quidem provident impedit
        excepturi autem!
      </p>
      <h3>Geschpeichert</h3>
      {/* <p>{userSaved}</p> */}
    </>
  );
};

export default Konto;
