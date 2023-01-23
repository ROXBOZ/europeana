import React from "react";
import { Link } from "react-router-dom";

const Card = ({ catalog }) => {
  // console.log("catalog", catalog);
  return (
    <>
      {/* {catalog &&
        catalog.map((c) => {
          const id = c.id;
          const clearId = id.replace("/2064115/", "");
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
          return (
            <Link className="card-link" to={`items/${clearId}`} key={clearId}>
              <div className="card" key={id}>
                <img className="card-img" src={img} alt={clearTitle} />
                <p className="card-title">{clearTitle}</p>
              </div>
            </Link>
          );
        })} */}
      <p>{catalog.dcTitleLangAware.de[0]}</p>
    </>
  );
};

export default Card;
