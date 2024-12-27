import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import MovieGrid from "../components/MovieGrid";


export default function WatchList() {
    const [userData, setUserData] = useState({});
    const [watchList, setWatchList] = useState([])
    // const [watchListData, setWatchListData] = useState(null)
    const [error, setError] = useState(null);
    const [reRender, setReRender] = useState(false);

    const navigate = useNavigate();



    async function getWatchList() {
        await axios({ url: '/proxy/user/info', method: "GET" })
            .then((response) => {
                if (!response.statusText == "OK") { throw new Error(`HTTP error, status: ${response.status}`) }

                setUserData(response.data); // set user data
                // now fetch watchList from TMDB API
                const url = "/proxy/watchList/list"
                axios({
                    method: 'GET',
                    url: url,
                })
                    .then((response) => {
                        setWatchList(response.data);
                        setReRender(true);
                    })
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

    console.log(watchList)
    return (
        <main>
            <h1 className="center">Watch List</h1>

            <div>
                {error ? (
                    <p>Error: {error.message}</p>
                ) :
                    watchList != null ? (
                        userData.TMDB_api_key ? (
                            <MovieGrid movies={watchList} link={link} />
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