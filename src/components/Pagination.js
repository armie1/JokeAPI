import React from 'react';

const Pagination = ({ jokesPerPage, totalJokes, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalJokes / jokesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {/* Previous Page Button */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            onClick={() => paginate(currentPage - 1)}
            className="page-link"
            aria-label="Previous"
          >
            &laquo;
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
          >
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}

        {/* Next Page Button */}
        <li
          className={`page-item ${
            currentPage === pageNumbers.length ? 'disabled' : ''
          }`}
        >
          <button
            onClick={() => paginate(currentPage + 1)}
            className="page-link"
            aria-label="Next"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
