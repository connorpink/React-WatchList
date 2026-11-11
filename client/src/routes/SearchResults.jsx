import "../styles/search.css"
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { MovieGridSkeleton } from "../components/Spinner";
import { useAuth } from "../auth";
import { tmdbGet, toMovie } from "../tmdb";

export default function SearchResults() {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("SearchTerm") || "";

    const [movies, setMovies] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!searchTerm) { setMovies([]); return; }
        let cancelled = false;
        setMovies(null);
        setError(null);

        tmdbGet("/search/movie", user.TMDB_api_key, { query: searchTerm, include_adult: false, page: 1 })
            .then((response) => { if (!cancelled) setMovies(response.data.results.map(toMovie)) })
            .catch((err) => { if (!cancelled) setError(err) });

        return () => { cancelled = true };
    }, [searchTerm, user.TMDB_api_key]);

    return (
        <main>
            <h1 className="center">Results for &ldquo;{searchTerm}&rdquo;</h1>
            {error ? (
                <p className="emptyState">Search failed: {error.message}</p>
            ) : movies === null ? (
                <MovieGridSkeleton />
            ) : movies.length === 0 ? (
                <p className="emptyState">No movies found.</p>
            ) : (
                <MovieGrid movies={movies} />
            )}
        </main>
    )
}
