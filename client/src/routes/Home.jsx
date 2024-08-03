import axios from 'axios';
import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";

export default function Home() {
    // state to store user data
    const [userData, setUserData] = useState({})
    const [movies, setMovies] = useState([])

    async function fetchUserData() {
        await fetch('/server/user/info')
            .then((response) => {
                if (!response.ok) { throw new Error(`HTTP error, status: ${response.status}`) }
                return response.json()
            })
            .then(data => {
                setUserData(data);
                if (data.TMDB_api_key) {
                    fetchMovies(data.TMDB_api_key);
                } else {
                    console.error("TMDB API key not found");
                }
            })
            .catch(error => {
                console.error("No user found", error)
                setUserData({ _id: "", username: "", email: "" })
            })
    }

    // output user data for testing
    // console.log('userData', userData)
    // console.log('key', api_key)  

    // now fetch movies from TMDB API
    async function fetchMovies(TMDB_api_key) {
        const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
        axios({
            method: 'GET',
            url,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_api_key} `,
            },
        })
            .then(response => setMovies(response.data))
            .catch(error => console.error('error:', error));
    }

    // function to fetch user data from server
    useEffect(() => {
        fetchUserData()
    }, []);




    return (
        <div className="App">
            <header className="App-header">

                {userData.TMDB_api_key ? (
                    <div>
                        {/* {console.log(movies)} */}
                        <MovieGrid movies={movies.results} />
                    </div>
                ) : (
                    <p> Please add TMDB api key in user profile </p>
                )}
                <br />


            </header >
        </div >
    );


}