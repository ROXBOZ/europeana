import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CardDetail = () => {
  // const location = useLocation();
  // const { catalog } = location.state;

  const { id } = useParams();
  // const c = catalog.filter((item) => item.id === id)[0];

  // const provider = c.dataProvider[0];
  // const title = c.dcTitleLangAware["de"];
  // const img = c.edmIsShownBy[0];
  // const description = c.dcDescription[0];
  // const copyrights = c.rights[0];

  return (
    <>
      <h2>item {id}</h2>
      {/* <h3 className="data-title">{title}</h3> */}
      {/* <img className="card-img" src={img} alt={title} /> */}
      {/* <p className="data-description">{description}</p>
      <div className="data-caption">
        <a href={copyrights}>©</a>
        <span className="data-author">{provider}</span>
      </div> */}
    </>
  );
};

export default CardDetail;
