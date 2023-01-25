import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const CardDetail = () => {
  let location = useLocation();
  const { content } = location.state;

  const [state, setState] = useState(null);

  useEffect(() => {
    setState(content);
  }, [location]);

  if (!state) {
    return <div>Loading...</div>;
  }

  const { clearTitle, img, provider, description, copyrights } = state;

  return (
    <div className="card-content">
      <h3 className="data-title">{clearTitle}</h3>
      <img className="card-img" src={img} alt={clearTitle} />
      <p className="data-description">{description}</p>
      <div className="data-caption">
        <span>
          ©&nbsp;
          <a href={copyrights} className="data-provider">
            {provider}
          </a>
        </span>
      </div>
    </div>
  );
};

export default CardDetail;
