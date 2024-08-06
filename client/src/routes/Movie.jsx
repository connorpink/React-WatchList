import { useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Movie() {
    const location = useLocation();
    const movie = location.state;

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    //define async fetch function called quickAdd
    const quickAdd = async () => {
        try {
            const url = `/proxy/watchList/add/${movie.id}/`;
            axios({
                // baseURL: SERVER_URL,
                method: 'PUT',
                url,
                headers: {
                    accept: 'application/json',
                }
            })
                .then(response => {
                    setSuccessMessage(`${movie.title} : ${response.data.message}`)
                })
                .catch(error => console.error('error:', error));

        } catch (error) {
            setError(error);
        }
    }
    const roundedRating = Math.round(movie.vote_average * 10) / 10// rounded value
    return (


        <main style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
            {movie && (
                <div className="MovieCard detailed" >
                    <div className="splitSpace">
                        <div className="split">
                            {(movie.poster_path) ?
                                <img className="poster" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                                :
                                ("")}
                        </div>
                        <div className="split">

                            {/* general information that every movie card should display*/}
                            <h2>{movie.title}</h2>
                            <p>{new Date(movie.release_date).toLocaleDateString()} | {roundedRating + (Math.abs((roundedRating) - Math.round(movie.vote_average)) < 0.01 ? ".0" : "")}/10| movie ID: {movie.id}</p>
                            <p>{movie.description}</p>
                            <p><b>Vote Count: </b>{movie.vote_count}</p>


                            <button onClick={quickAdd}>quick add to watch list</button>
                            <p>
                                {error ? (
                                    <span>Error: {error.message}</span>
                                ) : successMessage ? (
                                    <span>{successMessage}</span>
                                ) : (
                                    <span />
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Movie;
