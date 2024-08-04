import "../styles/search.css"
import { useNavigate } from 'react-router-dom';

// import axios from 'axios';
import { useState } from "react";


export default function SearchBar() {

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    function handleSearch() {
        navigate(`/search?SearchTerm=${searchTerm}`);
    }

    return (
        <div className="searchDiv">
            <input type="text" placeholder="Search..." onChange={(event) => { setSearchTerm(event.target.value.toLowerCase()) }} onKeyDown={(event) => { if (event.key === 'Enter') { handleSearch() } }}
            />
            <button className="btn btn-primary" onClick={() => handleSearch()}>Search</button>
        </div>
    )
}