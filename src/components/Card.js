import React from "react";
import { Link } from "react-router-dom";

const Card = ({ catalog }) => {
  return (
    <>
      {catalog &&
        catalog.map((c) => {
          const id = c.id;
          const clearId = id.replace("/2064115/", "");
          console.log("c.dcTitleLangAware", c.dcTitleLangAware["de"][0]);
          const title = c.dcTitleLangAware["de"][0];
          let shortTitle;
          if (title.length > 40) {
            shortTitle = title.substring(0, 40) + "...";
          } else {
            shortTitle = title;
          }
          const clearTitle = shortTitle
            .replace("Fotografie: ", "")
            .replace("Diapositive: ", "")
            .replace("Diapositiv: ", "")
            .replace("um ", "~");

          const img = c.edmIsShownBy[0];
          const index = c.index;
          // const index = indexOf(c);
          return (
            <Link className="card-link" to={`items/${clearId}`} key={clearId}>
              <div className="card" key={id}>
                <span>{index}</span>
                <img className="card-img" src={img} alt={clearTitle} />
                <p className="card-title">{clearTitle}</p>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default Card;
