import MovieCard from './MovieCard';
import "../styles/MovieGrid.css";

export default function MovieGrid({ movies, link, isWatchlist }) {
    return (
        <section className="MovieGrid">
            {movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} link={link} isWatchlist={isWatchlist} />
            ))}
        </section>
    )
}
