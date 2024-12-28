export default function SortControls(setSortBy, setSortByOrder, setPage, page, maxPages) {


    return (
        <div className="SortBox">
            <label htmlFor="sortBy">Sort By:</label>
            <select id="sortBy" onChange={(e) => setSortBy(e.target.value)}>
                <option value="original_title">Original Title</option>
                <option value="title">Title</option>
                <option value="popularity">Popularity</option>
                <option value="revenue">Revenue</option>
                <option value="vote_average">Rating</option>
                <option value="primary_release_date">Primary Release Date</option>
                <option value="vote_average">Vote Average</option>
                <option value="vote_count">Vote Count</option>
            </select>
            <select id="sortByOrder" onChange={(e) => setSortByOrder(e.target.value)}>
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
            </select>
            <label htmlFor="pageSearch">Page: </label>
            <input type="number" id="pageSearch" min="1" max={maxPages} value={page} onChange={(e) => setPage(e.target.value)} />
        </div>
    )
}