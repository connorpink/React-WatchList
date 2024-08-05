import React from 'react';
import { Link } from "react-router-dom";


import '../styles/MovieCard.css';

/*
component takes 3 props:

generalInfo: {
    general info every card should display
    additionalInfo: array[{
        name: label for optional filed being added
        details: content of the optional field
    }]
}

link: {
    name: name of the link
    location: where you want the link to redirect the user (component will automatically send the movieId with the redirect)
}
*/

function MovieCard({ movie, link }) {

    const roundedRating = Math.round(movie.vote_average * 10) / 10// rounded value

    // console.log(movie.genre_ids)
    return (
        <div className="MovieCard">
            {(movie.poster_path) ?
                <img className="poster" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                :
                ("")}
            {/* general information that every movie card should display*/}
            <h2>{movie.title}</h2>
            <p>{new Date(movie.release_date).toLocaleDateString()} | {roundedRating + (Math.abs((roundedRating) - Math.round(movie.vote_average)) < 0.01 ? ".0" : "")}/10 | Movie ID: {movie.id}</p>
            <p>{movie.description}</p>

            {/* additional information that the parent component may want to have displayed */}
            {movie.additionalInfo && movie.additionalInfo.length > 0 && (
                movie.additionalInfo.map((info, index) => (
                    <p key={index}><b>{info.name}:</b> {info.details}</p>
                ))
            )}

            <div className='links'>
                {/* link to more information */}
                <Link to={`/movie/${movie.id}`} state={movie} > Movie Details </Link>

                {/* optional additional link at bottom of card */}
                {link && <Link to={`${link.location}/${movie.id}`} state={movie}> {link.name} </Link>}

            </div>
        </div>
    );
}

export default MovieCard;
