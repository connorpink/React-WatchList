import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import SearchBar from "./SearchBar";

export default function NavBar({ userData }) {
    return (
        <nav className="navbar">



            {
                userData._id != "" ?
                    <>
                        <div className="NavElements">
                            <NavLink to='/'>Home</NavLink>
                            <NavLink to="/watchList">Watch List</NavLink>

                            <NavLink to="/profile">Profile</NavLink>
                        </div>
                        <SearchBar />

                    </> : <>
                        <div className="NavElements">
                            <NavLink to='/'>Home</NavLink>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/register">Create Account</NavLink>
                        </div>
                    </>

            }

        </nav>
    );
}

