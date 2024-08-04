import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";

export default function NavBar({ userData }) {
    return (
        <nav className="navbar">
            <NavLink to='/'>Home</NavLink>

            {
                userData._id != "" ?
                    <>

                        <NavLink to="/watchList">Watch List</NavLink>

                        <NavLink to="/profile">Profile</NavLink>

                    </> : <>

                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Create Account</NavLink>

                    </>
            }
        </nav>
    );
}

