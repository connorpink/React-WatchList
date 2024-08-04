import { useState, useEffect } from "react"
import axios from 'axios';
import MovieGrid from "../components/MovieGrid";


export default function WatchList() {
    const [userData, setUserData] = useState({});
    const [watchList, setWatchList] = useState([])
    const [watchListData, setWatchListData] = useState([])
    const [error, setError] = useState(null);
    const [reRender, setReRender] = useState(false);




    async function getWatchList() {
        await fetch('/server/user/info')
            .then((response) => {
                if (!response.ok) { throw new Error(`HTTP error, status: ${response.status}`) }
                return response.json()
            })
            .then(data => {
                setUserData(data); // set user data
                // now fetch watchList from TMDB API
                const url = "server/watchList/list"
                axios({
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
                                    { name: 'Movie ID', details: entry.movieId },
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


    const link = {
        name: 'Edit Entry',
        location: '/watchListEntry'
    }

    console.log(watchListData)
    return (
        <div>
            {error ? (
                <p>Error: {error.message}</p>
            ) : watchListData === null ? (
                <p>Loading...</p>
            ) : (
                <MovieGrid movies={watchListData} link={link} />
            )}

        </div>
    )
}