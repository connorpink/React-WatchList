import { useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AdditionalMovieInfo from '../components/AdditionalMovieInfo';


function Movie() {
    const location = useLocation();
    const movie = location.state;
    const [successMessage, setSuccessMessage] = useState("");

    //define async fetch function called quickAdd
    const quickAdd = async () => {
        try {
            const url = `/proxy/watchList/add/${movie.id}`;
            axios({
                method: 'PUT',
                url: url,
                headers: { 'Content-type': 'application/json; charset=UTF-8', },
                data: {
                    movieTitle: movie.title,
                    releaseDate: movie.release_date,
                    rating: movie.vote_average,
                    overview: movie.overview,
                    posterPath: movie.poster_path,
                    backdropPath: movie.backdrop_path
                },
            })
                .then(response => {
                    // Set success message
                    setSuccessMessage(`${movie.title} : ${response.data.message}`);
                    // Clear success message after 3 seconds
                    setTimeout(() => setSuccessMessage(""), 5000);
                })
                .catch(error => {
                    console.error('error:', error)
                }
                );

        } catch (error) {
            // setError(error);
            // Show error alert
            alert(`Error: ${error}`);
        }
    }
    return (


        <main style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
            {movie && (
                <div className="center">
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
                                <AdditionalMovieInfo movie={movie} />
                                <p>{movie.overview}</p>
                                <p><b>Vote Count: </b>{movie.vote_count}</p>


                                <button onClick={quickAdd}>quick add to watch list</button>
                                {successMessage && <div className="success-message">{successMessage}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Movie;
