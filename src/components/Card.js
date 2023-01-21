import React from "react";
// import CardDetail from "./CardDetail";

const Card = ({ catalog }) => {
  return (
    <>
      {catalog &&
        catalog.map((c) => {
          // const provider = c.dataProvider[0];
          const id = c.id;
          const title = c.dcTitleLangAware["de"];
          // const shortenTitle = title.replace("Fotografie: ", "");

          const img = c.edmIsShownBy[0];
          // const description = c.dcDescription[0];
          // const copyrights = c.rights[0];

          return (
            <div className="card" key={id}>
              <h3 className="data-title">{title}</h3>
              <img className="card-img" src={img} alt={title} />
              {/* <p className="data-description">{description}</p> */}
              <button>Einzelheiten</button>
              {/* <CardDetail c={c} /> */}
              {/* <div className="data-caption">
                <a href={copyrights}>©</a>
                <span className="data-author">{provider}</span>
              </div> */}
            </div>
          );
        })}
    </>
  );
};

export default Card;

// fetch the whole collection = +2000 pictures
// create thumbnails then pages
// FILTERS per street name
// clean up title (remove fotografie, "um")
// hide API KEY
// create store for API

////////

// be able to like the picture
// be able to save picture
// scss typo
