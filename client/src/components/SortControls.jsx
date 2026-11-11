import "../styles/sortControls.css";

const SORT_OPTIONS = [
    { value: "popularity", label: "Popularity" },
    { value: "vote_average", label: "Rating" },
    { value: "primary_release_date", label: "Release date" },
    { value: "title", label: "Title" },
    { value: "revenue", label: "Revenue" },
    { value: "vote_count", label: "Vote count" },
];

export default function SortControls({ sortBy, sortOrder, onSortByChange, onSortOrderChange }) {
    const isDesc = sortOrder === "desc";

    return (
        <div className="sortBar">
            <div className="sortChips" role="radiogroup" aria-label="Sort by">
                {SORT_OPTIONS.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={sortBy === option.value}
                        className={`sortChip ${sortBy === option.value ? "active" : ""}`}
                        onClick={() => onSortByChange(option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            <button
                type="button"
                className="sortOrder"
                onClick={() => onSortOrderChange(isDesc ? "asc" : "desc")}
                title={isDesc ? "Descending: click for ascending" : "Ascending: click for descending"}
            >
                <span className={`sortArrow ${isDesc ? "" : "up"}`}>↓</span>
                {isDesc ? "High → Low" : "Low → High"}
            </button>
        </div>
    );
}
