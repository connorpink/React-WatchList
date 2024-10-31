// import { useState } from 'react';
import "../styles/pagination.css"
export default function Pagination({ onPageChange, maxPages, page }) {

    function handlePageChange(direction) {
        if (direction > 0 && page < maxPages) {
            onPageChange(page + direction);
            window.scrollTo(0, 0)

        } else if (direction < 1 && page > 1) {
            onPageChange(page - 1);
            window.scrollTo(0, 0)

        }
    }


    return (

        <div className="pagination">
            <button className="btn btn-info pageButton" onClick={() => handlePageChange(0)}>Previous</button >
            {maxPages > 1 && <span>Page {page}</span>}
            <button className="btn btn-info pageButton" onClick={() => handlePageChange(1)}> Next </button>
        </div>
    )
}
