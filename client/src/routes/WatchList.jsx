import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import axios from 'axios';

import MovieGrid from "../components/MovieGrid";
import { MovieGridSkeleton } from "../components/Spinner";

const link = {
    name: 'Edit Entry',
    location: '/watchListEntry'
}

export default function WatchList() {
    const [watchList, setWatchList] = useState(null)
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("/proxy/watchList/list")
            .then((response) => setWatchList(response.data))
            .catch((err) => setError(err));
    }, []);

    return (
        <main>
            <h1 className="center">Watch List</h1>

            {error ? (
                <p className="emptyState">Couldn&apos;t load your watch list: {error.message}</p>
            ) : watchList === null ? (
                <MovieGridSkeleton count={4} />
            ) : watchList.length === 0 ? (
                <div className="emptyState">
                    <p>Your watch list is empty.</p>
                    <Link to="/" style={{ color: "var(--base-color)", textDecoration: "underline" }}>Find something to watch</Link>
                </div>
            ) : (
                <MovieGrid movies={watchList} link={link} isWatchlist={true} />
            )}
        </main>
    )
}
