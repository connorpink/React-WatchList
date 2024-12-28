import { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AdditionalMovieInfo from '../components/AdditionalMovieInfo';

function Movie() {
    const location = useLocation();
    const movie = location.state;
    const [successMessage, setSuccessMessage] = useState("");
    const [isOnWatchlist, setIsOnWatchlist] = useState(true);

    useEffect(() => {
        // Fetch watchlist status when component mounts
        const fetchWatchlistStatus = async () => {
            try {
                const response = await axios.get(`/proxy/watchList/status/${movie.id}`);
                setIsOnWatchlist(response.data.isOnWatchlist);
            } catch (error) {
                console.error('Error fetching watchlist status:', error);
            }
        };

        fetchWatchlistStatus();
    }, [movie.id]);

    // Define async fetch function called quickAdd
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
                    setTimeout(() => setSuccessMessage(""), 4000);
                    // Update watchlist status
                    setIsOnWatchlist(true);
                })
                .catch(error => {
                    console.error('error:', error);
                });

        } catch (error) {
            alert(`Error: ${error}`);
        }
    };

    // remove from watchlist function
    const removeFromWatchlist = async () => {

        try {
            const url = `/proxy/watchList/delete/${movie.id}`;
            const deleteResponse = await axios({
                method: 'DELETE',
                url: url,
            })
            console.log(deleteResponse);
            if (deleteResponse.statusText == "OK") {
                setIsOnWatchlist(!isOnWatchlist);
                setSuccessMessage(`${deleteResponse.data.message}`);
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            alert(`Error: ${error}`);
        }
    };

    return (
        <main style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
            {movie && (
                <div className="center">
                    <div className="MovieCard detailed">
                        <div className="splitSpace">
                            <div className="split">
                                {movie.poster_path && (
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                )}
                            </div>
                            <div className="split">
                                <h1>{movie.title}</h1>
                                <AdditionalMovieInfo movie={movie} />
                                <p>{movie.overview}</p>
                                {!isOnWatchlist && (
                                    <button onClick={quickAdd}>Quick Add to Watchlist</button>
                                )}
                                {isOnWatchlist && (
                                    <button
                                        className="watchlist-indicator"
                                        onClick={removeFromWatchlist}
                                        title="Click to remove from watchlist"
                                    >
                                        <span>✓ On your Watchlist</span>
                                    </button>
                                )}
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
