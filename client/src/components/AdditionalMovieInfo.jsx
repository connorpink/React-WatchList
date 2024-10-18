import { useEffect, useState } from 'react';

export default function AdditionalMovieInfo({ movie }) {
    const [data, setData] = useState(null);
    useEffect(() => {
        // When the movie prop changes, update the state with the new props
        setData(movie);
    }, [movie]);
    // console.log('AdditionalMovieInfo', data);
    const roundedRating = Math.round(movie.vote_average * 10) / 10;

    return (
        <p>
            {new Date(movie.release_date).toLocaleDateString()} | {roundedRating + (Math.abs((roundedRating) - Math.round(movie.vote_average)) < 0.01 ? ".0" : "")}/10 | <a className="linkID" href={`https://www.themoviedb.org/movie/${movie.id}`}>{movie.id}</a>
        </p>
    );
}
