import React from "react";
import Card from "./Card";

const Preview = ({ c }) => {
  const provider = c.dataProvider[0];
  const title = c.dcTitleLangAware["de"];
  const img = c.edmIsShownBy[0];
  const description = c.dcDescription[0];
  const copyrights = c.rights[0];
  return (
    <>
      <h3 className="data-title">{title}</h3>
      <img className="card-img" src={img} alt={title} />
      <p className="data-description">{description}</p>
      <button>Einzelheiten</button>
      <div className="data-caption">
        <a href={copyrights}>©</a>
        <span className="data-author">{provider}</span>
      </div>
    </>
  );
};

export default Preview;
