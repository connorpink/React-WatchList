import '../styles/login.css'
import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../auth';

function Login() {
    const { refreshUser } = useAuth();
    const location = useLocation();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        setErrorMessage("");
    }, [username, password])

    async function attemptLogin(event) {
        event.preventDefault();
        if (!username) return setErrorMessage("No username given")
        if (!password) return setErrorMessage("No password given")

        setSubmitting(true)
        try {
            const response = await axios.post("/proxy/user/login", { username, password })
            const message = response.data.message
            if (message === "badUser") setErrorMessage("Username not found")
            else if (message === "badPass") setErrorMessage("Password incorrect")
            else if (message === "success") await refreshUser()
            else setErrorMessage("Login failed, please try again")
        } catch {
            setErrorMessage("Couldn't reach the server, please try again")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main>
            <form className="loginForm" id="loginForm" onSubmit={attemptLogin}>
                <h1>Login</h1>
                <div className="textInput">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder=' '
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <label htmlFor="username">Username</label>
                </div>

                <div className="textInput">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder=' '
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                </div>

                <button type="submit" id="submitButton" disabled={submitting}>
                    {submitting ? "Logging in…" : "Login"}
                </button>
                <p className={errorMessage ? "error" : "hidden"} aria-live="assertive">{errorMessage}</p>
                <p>Don&apos;t have an account?</p>
                <Link to="/register" state={location.state}>Create account</Link>
            </form>
        </main>
    )
}

export default Login
