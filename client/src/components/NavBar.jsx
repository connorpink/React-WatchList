import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import SearchBar from "./SearchBar";
import { useAuth } from "../auth";

export default function NavBar() {
    const { user } = useAuth();

    return (
        <nav className="navbar">
            {user === undefined ? null : user ? (
                <>
                    <div className="NavElements">
                        <NavLink to='/' end>Home</NavLink>
                        <NavLink to="/watchList">Watch List</NavLink>
                        <NavLink to="/profile">Profile</NavLink>
                    </div>
                    <SearchBar />
                </>
            ) : (
                <div className="NavElements">
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Create Account</NavLink>
                </div>
            )}
        </nav>
    );
}
