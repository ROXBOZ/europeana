import React, { useContext } from "react";
import { ItemsContext } from "../store/ItemsContext";

const Pagination = ({ handleNext, handlePrev }) => {
  const { page } = useContext(ItemsContext);
  return (
    <div className="pagination-button-container">
      <button
        className="pagination-button"
        disabled={page === 1 ? true : false}
        onClick={handlePrev}
      >
        ←&nbsp;vor
      </button>
      <button className="pagination-button" onClick={handleNext}>
        nächste&nbsp;→
      </button>
    </div>
  );
};

export default Pagination;
