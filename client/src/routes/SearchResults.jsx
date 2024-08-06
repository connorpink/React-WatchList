import "../styles/search.css"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";

import axios from 'axios';
import { SERVER_URL } from "../tools/ServerUrl"


export default function SearchResults() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const SearchTerm = searchParams.get("SearchTerm");


    const [userData, setUserData] = useState({})
    const [movies, setMovies] = useState([])
    async function fetchUserData() {
        await axios({ baseURL: SERVER_URL, url: '/user/info', method: "GET" })
            .then((response) => {

                if (!response.statusText == "OK") { throw new Error(`HTTP error, status: ${response.status}`) }

                setUserData(response.data);
                // now fetch movies from TMDB API

                const url = `https://api.themoviedb.org/3/search/movie?query=${SearchTerm}&include_adult=false&language=en-US&page=1`;
                axios({
                    method: 'GET',
                    url,
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${response.data.TMDB_api_key} `,
                    },
                })
                    .then(response => {
                        setMovies(response.data.results.map(movie => ({
                            id: movie.id,
                            genre_ids: movie.genre_ids,
                            title: movie.title,
                            release_date: movie.release_date,
                            description: movie.overview,
                            vote_average: movie.vote_average,
                            vote_count: movie.vote_count,
                            poster_path: movie.poster_path,
                            backdrop_path: movie.backdrop_path,
                        })));
                    })
                    .catch(error => console.error('error:', error));
            })
            .catch(error => {
                console.error("No user found", error)
                setUserData({ _id: "", username: "", email: "" })
            })
    }

    // function to fetch user data from server
    useEffect(() => {
        fetchUserData()
    }, [SearchTerm]);


    return (
        <main>
            <div className="App">
                <header className="App-header">
                    {/* if not logged in IE userData id is empty then redirect to login page */}
                    {userData._id === "" && navigate("/login")}

                    {/* if user has IMDB key display movies else display message to add a key */}
                    {userData.TMDB_api_key ? (
                        <div>

                            {/* <Pagination onPageChange={handlePageChange} maxPages={maxPages} page={page} /> */}
                            <MovieGrid movies={movies} />

                        </div>
                    ) : (
                        <p className="center"> Loading... </p>
                    )}
                    <br />


                </header >
            </div >
        </main>
    )
}