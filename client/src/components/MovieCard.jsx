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

    return (
        <div className="MovieCard">

            {/* general information that every movie card should display*/}
            <h2>{movie.title}</h2>
            <p>{new Date(movie.release_date).toLocaleDateString()} | {Math.round(movie.vote_average * 10) / 10}/10 | {movie.runtime} minutes</p>
            <p>{movie.description}</p>

            {/* additional information that the parent component may want to have displayed */}
            {movie.additionalInfo && movie.additionalInfo.length > 0 && (
                movie.additionalInfo.map((info, index) => (
                    <p key={index}><b>{info.name}:</b> {info.details}</p>
                ))
            )}

            <div className='links'>
                {/* link to more information */}
                <Link to={`/movie/${movie.movieID}`} state={movie}> Movie Details </Link>

                {/* optional additional link at bottom of card */}
                {link && <Link to={`${link.location}/${movie.movieID}`} state={movie}> {link.name} </Link>}

            </div>
        </div>
    );
}

export default MovieCard;
