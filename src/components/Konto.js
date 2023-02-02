import React, { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { ItemsContext } from "../store/ItemsContext";
import Card from "./Card";
import { useEffect } from "react";

const Konto = () => {
  const { user, firebaseUsername } = useContext(AuthContext);
  const { data, NoSearchUrl, fetchData, id, userSaved } =
    useContext(ItemsContext);

  useEffect(() => {
    fetchData(NoSearchUrl);
  }, []);

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

      {user && (
        <>
          {data.items ? (
            data.items.map((c) => {
              const id = c.id.replace(
                "/2064115/Museu_ProvidedCHO_museum_digital_",
                ""
              );

              if (userSaved.includes(id)) {
                return <Card key={id} c={c} id={id} />;
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
