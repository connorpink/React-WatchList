import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import MovieCard from '../components/MovieCard';

import "../styles/watchList.css"

function WatchListEntry() {
    const navigate = useNavigate();

    const location = useLocation();
    const movie = location.state;


    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    // const [priority, setPriority] = useState(movie.additionalInfo[0].details);
    // const [notes, setNotes] = useState(movie.additionalInfo[1].details);
    const [priority, setPriority] = useState(movie.priority)
    const [notes, setNotes] = useState(movie.notes)

    // for priority
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
            console.log(patchResponse);

            setSuccessMessage(`${patchResponse.data.message}`);
            //redirect back to the watchList page
            navigate('/watchList');
        } catch (error) {
            setError(error);
        }
    };


    // function to handle user pressing the delete button
    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            const url = `/proxy/watchList/delete/${movie.id}`;
            const deleteResponse = await axios({
                method: 'DELETE',
                url: url,
            })
            console.log(deleteResponse);

            setSuccessMessage(`${deleteResponse.data.message}`);
            //redirect back to the watchList page
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

export default WatchListEntry;