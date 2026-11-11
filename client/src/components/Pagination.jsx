import "../styles/pagination.css"

export default function Pagination({ onPageChange, maxPages, page }) {
    function goTo(newPage) {
        if (newPage < 1 || newPage > maxPages) return;
        onPageChange(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (maxPages <= 1) return null;

    return (
        <div className="pagination">
            <button className="btn btn-info pageButton" disabled={page <= 1} onClick={() => goTo(page - 1)}>Previous</button>
            <span>Page {page} of {maxPages}</span>
            <button className="btn btn-info pageButton" disabled={page >= maxPages} onClick={() => goTo(page + 1)}>Next</button>
        </div>
    )
}
