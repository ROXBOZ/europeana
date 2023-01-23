import React from "react";

const Pagination = ({ page, handleNext, handlePrev, result }) => {
  return (
    <div className="pagination-button-container">
      <button
        className="pagination-button"
        disabled={page === 1 ? true : false}
        onClick={handlePrev}
      >
        ←&nbsp;vor
      </button>
      <button
        className="pagination-button"
        disabled={page >= result ? true : false}
        onClick={handleNext}
      >
        nächste&nbsp;→
      </button>
    </div>
  );
};

export default Pagination;
