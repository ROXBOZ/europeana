import React from "react";

const Pagination = ({ page, handleNext, handlePrev, totalResult }) => {
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
        disabled={page >= totalResult ? true : false}
        onClick={handleNext}
      >
        nächste&nbsp;→
      </button>
    </div>
  );
};

export default Pagination;
