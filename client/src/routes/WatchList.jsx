import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import MovieGrid from "../components/MovieGrid";


export default function WatchList() {
    const [userData, setUserData] = useState({});
    const [watchList, setWatchList] = useState([])
    const [watchListData, setWatchListData] = useState(null)
    const [error, setError] = useState(null);
    const [reRender, setReRender] = useState(false);

    const navigate = useNavigate();



    async function getWatchList() {
        await axios({ baseURL: "http://3.22.216.215:4000", url: '/user/info', method: "GET" })
            .then((response) => {
                if (!response.statusText == "OK") { throw new Error(`HTTP error, status: ${response.status}`) }

                setUserData(response.data); // set user data
                // now fetch watchList from TMDB API
                const url = "/watchList/list"
                axios({
                    baseURL: "http://3.22.216.215:4000",
                    method: 'GET',
                    url,
                })
                    .then(async response => {
                        setWatchList(response.data);// set watch list data

                        // get movie data 
                        const movieList = await Promise.all(watchList.map(async entry => {
                            const url = `https://api.themoviedb.org/3/movie/${entry.movieId}language=en-US`;
                            const movieResponse = await axios({
                                method: 'GET',
                                url,
                                headers: {
                                    accept: 'application/json',
                                    Authorization: `Bearer ${userData.TMDB_api_key} `,
                                },
                            })

                            const movieData = movieResponse.data
                            return {
                                ...movieData,
                                additionalInfo: [
                                    // { name: 'Movie ID', details: entry.movieId },
                                    { name: 'Priority', details: entry.priority },
                                    { name: 'Notes', details: entry.notes }
                                ]
                            };
                        }))
                        console.log(movieList); // console log movie/watchlist data
                        //set movielist/watchlist data 
                        setWatchListData(movieList);
                        setReRender(true);
                    })
                    .catch(error => {
                        console.error('error:', error);
                        setError(error);
                    });
            })

            .catch(error => {
                console.error("No user found", error)
                setError(error);
                setUserData({ _id: "", username: "", email: "" })
            })
    }

    useEffect(() => {
        getWatchList()
    }, [reRender]);


    // if not logged in IE userData id is empty then redirect to login page 
    useEffect(() => {
        if (userData._id === "")
            navigate('/login')
    }, [userData]);


    const link = {
        name: 'Edit Entry',
        location: '/watchListEntry'
    }

    console.log(watchListData)
    return (
        <main>
            <h1 className="center">Watch List</h1>

            <div>
                {error ? (
                    <p>Error: {error.message}</p>
                ) :
                    watchListData != null ? (
                        userData.TMDB_api_key ? (
                            <MovieGrid movies={watchListData} link={link} />
                        ) : (
                            < p className="center"> Please add an API key to your account. </p>
                        )
                    ) : (
                        <p className="center"> Loading... </p>
                    )}
            </div>
        </main>
    )
}