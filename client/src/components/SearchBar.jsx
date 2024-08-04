import "../styles/search.css"
import axios from 'axios';
import { useState } from "react";


export default function SearchBar({ userData }) {

    const [searchTerm, setSearchTerm] = useState('');


    async function handleSearch() {
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=`;
        axios({
            method: 'GET',
            url,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${userData.TMDB_api_key} `,
            },
        })
            .then(response => {

            })
    }

    return (
        <div className="searchDiv">
            <input type="text" placeholder="Search..." onChange={(event) => { setSearchTerm(event.target.value.toLowerCase()) }} />
            <button className="btn btn-primary" onClick={() => handleSearch()}>Search</button>
        </div>
    )
}