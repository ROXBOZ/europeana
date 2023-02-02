import React from "react";
import { Link } from "react-router-dom";

const Card = ({ c, id }) => {
  const title = c.dcTitleLangAware["de"][0];
  const img = c.edmIsShownBy[0];
  const provider = c.dataProvider[0];
  const description = c.dcDescription[0];
  const copyrights = c.rights[0];
  const creator = c.dcCreator;

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

  const itemDetail = {
    id,
    title,
    clearTitle,
    img,
    provider,
    description,
    copyrights,
    creator,
  };

  return (
    <Link
      className="card-link"
      to={{ pathname: `/items/${id}` }}
      state={{ content: itemDetail }}
      key={id}
    >
      <div className="card">
        <img className="card-img" src={img} alt={clearTitle} />
        <p className="card-title">{clearTitle}</p>
      </div>
    </Link>
  );
};

export default Card;
