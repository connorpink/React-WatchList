import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";

export default function Home() {
    const navigate = useNavigate();

    // state to store user data
    const [userData, setUserData] = useState({})
    const [movies, setMovies] = useState([])
    const [maxPages, setMaxPages] = useState()
    const [page, setPage] = useState(1)

    function handlePageChange(direction) {
        //next page
        if (direction > 0 && page < maxPages) {
            setPage(page + direction)
        }
        //previous page
        else if (direction < 1 && page > 1) {
            setPage(page - 1)
            // fetchUserData()
        }
        fetchUserData();
    }

    console.log("current Page" + page);
    async function fetchUserData() {
        await fetch('/server/user/info')
            .then((response) => {
                if (!response.ok) { throw new Error(`HTTP error, status: ${response.status}`) }
                return response.json()
            })
            .then(data => {
                setUserData(data);
                // now fetch movies from TMDB API

                const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
                axios({
                    method: 'GET',
                    url,
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${data.TMDB_api_key} `,
                    },
                })
                    .then(response => {
                        setMaxPages(response.data.total_pages);
                        setMovies(response.data.results.map(movie => ({
                            id: movie.id,
                            genre_ids: movie.genre_ids,
                            title: movie.title,
                            release_date: movie.release_date,
                            description: movie.overview,
                            vote_average: movie.vote_average,
                            vote_count: movie.vote_count,
                            poster_path: movie.poster_path,
                        })));
                    })
                    .catch(error => console.error('error:', error));
            })
            .catch(error => {
                console.error("No user found", error)
                setUserData({ _id: "", username: "", email: "" })
            })
    }

    console.log(maxPages);

    // function to fetch user data from server
    useEffect(() => {
        fetchUserData()
    }, [page]);




    return (
        <div className="App">
            <header className="App-header">
                {/* if not logged in IE userData id is empty then redirect to login page */}
                {userData._id === "" && navigate("/login")}

                {/* if user has IMDB key display movies else display message to add a key */}
                {userData.TMDB_api_key ? (
                    <div>
                        <button onClick={() => handlePageChange(0)}>Previous Page</button>
                        <button onClick={() => handlePageChange(1)}>Next Page</button>
                        <MovieGrid movies={movies} />

                    </div>
                ) : (
                    <p> Please add TMDB api key in user profile </p>
                )}
                <br />


            </header >
        </div >
    );


}