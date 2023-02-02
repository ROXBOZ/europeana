import React, { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { ItemsContext } from "../store/ItemsContext";
import Card from "./Card";
import { useEffect } from "react";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const Konto = () => {
  const { user, firebaseUsername } = useContext(AuthContext);
  const { data, NoSearchUrl, fetchData, userSaved, setUserSaved } =
    useContext(ItemsContext);

  useEffect(() => {
    fetchData(NoSearchUrl);
  }, []);

  const handleDelete = async (e, id) => {
    const savedItemRef = doc(db, "saved", user.uid);
    await updateDoc(savedItemRef, {
      savedItems: arrayRemove(id),
    });
    setUserSaved(userSaved.filter((item) => item !== id));
  };

  return (
    <>
      <h1>Mein Konto</h1>
      <h2>Konto von {firebaseUsername}</h2>
      <p>
        Auf dieser Seite hast du die Möglichkeit, die Bilder anzusehen, die du
        gespeichert hast.
      </p>

      <h3>Geschpeichert</h3>

      {user && (
        <>
          {data.items ? (
            data.items.map((c) => {
              const id = c.id.replace(
                "/2064115/Museu_ProvidedCHO_museum_digital_",
                ""
              );

              if (userSaved.includes(id)) {
                return (
                  <>
                    <div className="saved-items-container">
                      <div className="saved-item-card">
                        <Card key={id} c={c} id={id} />
                      </div>
                      <button
                        onClick={(e) => handleDelete(e, id)}
                        className="saved-item-close"
                      >
                        &times;
                      </button>
                    </div>
                  </>
                );
              } else {
                return null;
              }
            })
          ) : (
            <p>...loading (1)...</p>
          )}
        </>
      )}
    </>
  );
};

export default Konto;
