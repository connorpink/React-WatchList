import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import SortControls from "../components/SortControls";
import { MovieGridSkeleton } from "../components/Spinner";
import { useAuth } from "../auth";
import { tmdbGet, toMovie } from "../tmdb";

// TMDB's discover endpoint only serves the first 500 pages
const TMDB_MAX_PAGES = 500;

export default function Home() {
    const { user } = useAuth();
    const apiKey = user.TMDB_api_key?.trim();

    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sort") || "popularity";
    const sortOrder = searchParams.get("order") || "desc";
    const page = Number(searchParams.get("page")) || 1;

    const [movies, setMovies] = useState(null);
    const [maxPages, setMaxPages] = useState(1);
    const [error, setError] = useState(null);

    function update(changes) {
        const next = { sort: sortBy, order: sortOrder, page, ...changes };
        setSearchParams({ sort: next.sort, order: next.order, page: String(next.page) });
    }

    useEffect(() => {
        if (!apiKey) return;
        let cancelled = false;
        setMovies(null);
        setError(null);

        tmdbGet("/discover/movie", apiKey, {
            include_adult: false,
            include_video: false,
            page,
            sort_by: `${sortBy}.${sortOrder}`,
            // without a vote floor, "rating" and "title" sorts are dominated by obscure entries
            "vote_count.gte": sortBy === "popularity" ? undefined : 200,
        })
            .then((response) => {
                if (cancelled) return;
                setMaxPages(Math.min(response.data.total_pages, TMDB_MAX_PAGES));
                setMovies(response.data.results.map(toMovie));
            })
            .catch((err) => {
                if (cancelled) return;
                console.error(err);
                setError("Couldn't load movies from TMDB. Check that your API key is valid.");
            });

        return () => { cancelled = true };
    }, [apiKey, page, sortBy, sortOrder]);

    if (!apiKey) {
        return (
            <main>
                <div className="emptyState">
                    <h1>Almost there</h1>
                    <p>Add a TMDB API Read Access Token on your <Link to="/profile" style={{ color: "var(--base-color)", textDecoration: "underline" }}>profile</Link> to browse movies.</p>
                </div>
            </main>
        );
    }

    return (
        <main>
            <h1 className="center">Discover Movies</h1>
            <SortControls
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortByChange={(value) => update({ sort: value, page: 1 })}
                onSortOrderChange={(value) => update({ order: value, page: 1 })}
            />

            {error ? (
                <p className="emptyState">{error}</p>
            ) : movies === null ? (
                <MovieGridSkeleton />
            ) : (
                <>
                    <MovieGrid movies={movies} />
                    <Pagination page={page} maxPages={maxPages} onPageChange={(p) => update({ page: p })} />
                </>
            )}
            <br />
        </main>
    );
}
