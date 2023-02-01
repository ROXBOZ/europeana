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

  // const [userSaved, setUserSaved] = useState([]);

  // const getSavedItems = async () => {
  //   // TO READ THE ITEMS
  //   // do this operation in context and send it to konto and send it to card detail
  //   // get the items from the database, get the array and loop over it, if saved id includes. id then run delete function
  //   // push and pull
  //   // method array remove
  //   const q = query(collection(db, "saved"));
  //   const querySnapshot = await getDocs(q);
  //   let AllItems = [];
  //   querySnapshot.forEach((doc) => {
  //     if (doc.id === user.uid) {
  //       let items = doc.data();
  //       for (let key in items) {
  //         if (key.startsWith("item_")) {
  //           AllItems.push(items[key]);
  //         }
  //       }
  //     }
  //   });
  //   setUserSaved(AllItems);
  // };

  // useEffect(() => {
  //   if (user?.uid) {
  //     getSavedItems();
  //   }
  // }, [user]);

  return (
    <>
      <h1>Mein Konto</h1>
      <h2>Mein Konto</h2>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores porro
        optio officia, a id sapiente voluptates nihil accusantium, reiciendis
        vel facilis provident similique quibusdam sed? Quidem provident impedit
        excepturi autem!
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
