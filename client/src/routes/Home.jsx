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
                // now fetch movies from TMDB API

                const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
                axios({
                    method: 'GET',
                    url,
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${data.TMDB_api_key} `,
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