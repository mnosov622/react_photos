import React from "react";
import "./Pagination.css";
interface PaginationProps {
  page: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  handlePrevPage,
  handleNextPage,
}) => {
  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={page === 1} className="pagination-button">
        Prev
      </button>
      <span className="page-number">Page {page}</span>
      <button onClick={handleNextPage} disabled={page === totalPages} className="pagination-button">
        Next
      </button>
    </div>
  );
};

export default Pagination;
