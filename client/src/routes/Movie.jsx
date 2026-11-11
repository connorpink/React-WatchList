import { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import AdditionalMovieInfo from '../components/AdditionalMovieInfo';
import Spinner from '../components/Spinner';
import { useAuth } from '../auth';
import { tmdbGet, toMovie } from '../tmdb';

function Movie() {
    const location = useLocation();
    const { movieid } = useParams();
    const { user } = useAuth();

    const [movie, setMovie] = useState(location.state);
    const [loadError, setLoadError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [isOnWatchlist, setIsOnWatchlist] = useState(null);

    useEffect(() => {
        if (location.state) { setMovie(location.state); return; }
        tmdbGet(`/movie/${movieid}`, user.TMDB_api_key)
            .then((response) => setMovie(toMovie(response.data)))
            .catch((error) => setLoadError(error));
    }, [movieid, location.state, user.TMDB_api_key]);

    useEffect(() => {
        axios.get(`/proxy/watchList/status/${movieid}`)
            .then((response) => setIsOnWatchlist(response.data.isOnWatchlist))
            .catch((error) => console.error('Error fetching watchlist status:', error));
    }, [movieid]);

    if (loadError) return <main><p className="emptyState">Couldn&apos;t load this movie.</p></main>;
    if (!movie) return <main><Spinner /></main>;

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
                    setSuccessMessage(`${movie.title} : ${response.data.message}`);
                    setTimeout(() => setSuccessMessage(""), 4000);
                    setIsOnWatchlist(true);
                })
                .catch(error => {
                    console.error('error:', error);
                });
        } catch (error) {
            alert(`Error: ${error}`);
        }
    };

    const removeFromWatchlist = async () => {
        try {
            const url = `/proxy/watchList/delete/${movie.id}`;
            const deleteResponse = await axios({
                method: 'DELETE',
                url: url,
            })
            if (deleteResponse.status === 200) {
                setIsOnWatchlist(false);
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
                                {isOnWatchlist === false && (
                                    <button onClick={quickAdd}>Quick Add to Watchlist</button>
                                )}
                                {isOnWatchlist === true && (
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
