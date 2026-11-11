export default function AdditionalMovieInfo({ movie }) {
    const rating = Number(movie.vote_average);
    const date = movie.release_date ? new Date(movie.release_date).toLocaleDateString() : "TBA";

    return (
        <p>
            {date} | {Number.isFinite(rating) ? rating.toFixed(1) : "–"}/10 | <a className="linkID" href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" rel="noreferrer">{movie.id}</a>
        </p>
    );
}
