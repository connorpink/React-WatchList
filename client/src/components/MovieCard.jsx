import React from 'react';
import { Link } from "react-router-dom";
import AdditionalMovieInfo from './AdditionalMovieInfo';

import '../styles/MovieCard.css';

function MovieCard({ movie, link, isWatchlist }) {
    if (!movie.id) {
        movie.id = movie.movieId;
    }
    return (
        <div className="MovieCard">
            {(movie.poster_path) ?
                <Link to={`/movie/${movie.id}`} state={movie}>
                    <img className="poster" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                </Link>
                :
                ("")}
            <h2>{movie.title}</h2>
            <AdditionalMovieInfo movie={movie} />
            <p>{movie.overview}</p>

            {movie.additionalInfo && movie.additionalInfo.length > 0 && (
                movie.additionalInfo.map((info, index) => (
                    <p key={index}><b>{info.name}:</b> {info.details ? info.details : "N/A"}</p>
                ))
            )}

            {isWatchlist && (
                <>
                    <p><b>Priority:</b> {movie.priority ? movie.priority : "N/A"}</p>
                    <p><b>Notes:</b> {movie.notes ? movie.notes : "N/A"}</p>
                </>
            )}
            <div className='links'>
                <Link to={`/movie/${movie.id}`} state={movie} > Movie Details </Link>

                {link && <Link to={`${link.location}/${movie.id}`} state={movie}> {link.name} </Link>}

            </div>
        </div>
    );
}

export default MovieCard;
