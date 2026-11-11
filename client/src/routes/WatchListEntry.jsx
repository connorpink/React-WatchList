import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';

import "../styles/watchList.css"

export default function WatchListEntryLoader() {
    const location = useLocation();
    const { movieid } = useParams();
    const [movie, setMovie] = useState(location.state);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (movie) return;
        axios.get("/proxy/watchList/list")
            .then((response) => {
                const entry = response.data.find((item) => String(item.movieId) === movieid);
                if (entry) setMovie({ ...entry, id: entry.movieId });
                else setNotFound(true);
            })
            .catch(() => setNotFound(true));
    }, [movie, movieid]);

    if (notFound) return <main><p className="emptyState">That movie isn&apos;t on your watch list.</p></main>;
    if (!movie) return <main><Spinner /></main>;
    return <WatchListEntry movie={movie} />;
}

function WatchListEntry({ movie }) {
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [priority, setPriority] = useState(movie.priority)
    const [notes, setNotes] = useState(movie.notes)

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const url = `/proxy/watchList/update/${movie.id}`;
            const patchResponse = await axios({
                method: 'PATCH',
                url: url,
                data: {
                    priority: priority,
                    notes: notes,
                }
            })

            setSuccessMessage(`${patchResponse.data.message}`);
            navigate('/watchList');
        } catch (error) {
            setError(error);
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            const url = `/proxy/watchList/delete/${movie.id}`;
            const deleteResponse = await axios({
                method: 'DELETE',
                url: url,
            })

            setSuccessMessage(`${deleteResponse.data.message}`);
            navigate('/watchList');
        } catch (error) {
            setError(error);
        }
    }

    return (
        <main style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
            <div className="center"><p className="titleCard">Edit Entry</p></div>

            <div className="settingsPage">

                <MovieCard movie={movie} />
                <div className="MovieCard">
                    {movie &&
                        <>

                            <form onSubmit={handleSubmit}>
                                <label >Current priority: </label>
                                <select value={priority} onChange={(event) => setPriority(event.target.value)}>
                                    {[...Array(10).keys()].map((rating) => <option key={rating + 1} value={rating + 1}>{rating + 1}</option>)}

                                </select>
                                <p>notes: </p>
                                <textarea value={notes} placeholder="Add notes..." onChange={(event) => setNotes(event.target.value)}></textarea>

                                <button type="submit">Update Entry</button>

                            </form>

                            <br />
                            <form onSubmit={handleDelete}>
                                <button type="submit">Remove Entry from List</button>

                            </form>
                            {error ? (
                                <span style={{ color: "red" }}>Error: {error.message}</span>
                            ) : successMessage ? (
                                <span style={{ color: "green" }}>{successMessage}</span>
                            ) : (
                                <span />
                            )}

                        </>
                    }
                </div>
            </div>

        </main >
    );
}

