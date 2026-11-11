import '../styles/login.css'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth';

function Register() {
    const { refreshUser } = useAuth();
    const location = useLocation();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [passwordOne, setPasswordOne] = useState("")
    const [passwordTwo, setPasswordTwo] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        setErrorMessage("")
    }, [username, email, passwordOne, passwordTwo])

    async function attemptRegister(event) {
        event.preventDefault();
        if (!username) return setErrorMessage("No username given")
        if (!email) return setErrorMessage("No email given")
        if (!passwordOne) return setErrorMessage("No password given")
        if (passwordOne !== passwordTwo) return setErrorMessage("Passwords don't match")

        setSubmitting(true)
        try {
            await axios.post("/proxy/user/register", { username, email, password: passwordOne })
            await refreshUser()
        } catch (error) {
            setErrorMessage(error.response?.data?.error || "Couldn't create account, please try again")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main>
            <form className='loginForm' id="registerForm" onSubmit={attemptRegister}>
                <h1>Create Account</h1>

                <div className='textInput'>
                    <input type="text" name="username" id="username" placeholder=' ' autoComplete="username" autoFocus
                        value={username} onChange={(event) => setUsername(event.target.value)} />
                    <label htmlFor="username">Username</label>
                </div>

                <div className='textInput'>
                    <input type="email" name="email" id="email" placeholder=' ' autoComplete="email"
                        value={email} onChange={(event) => setEmail(event.target.value)} />
                    <label htmlFor="email">Email</label>
                </div>

                <div className='textInput'>
                    <input type="password" name="passwordOne" id="passwordOne" placeholder=' ' autoComplete="new-password"
                        value={passwordOne} onChange={(event) => setPasswordOne(event.target.value)} />
                    <label htmlFor="passwordOne">Password</label>
                </div>

                <div className='textInput'>
                    <input type="password" name="passwordTwo" id="passwordTwo" placeholder=' ' autoComplete="new-password"
                        value={passwordTwo} onChange={(event) => setPasswordTwo(event.target.value)} />
                    <label htmlFor="passwordTwo">Confirm Password</label>
                </div>

                <button type="submit" id="submitButton" disabled={submitting}>
                    {submitting ? "Creating account…" : "Create Account"}
                </button>

                <p className={errorMessage ? "error" : "hidden"} aria-live="assertive">{errorMessage}</p>

                <p>Already have an account?</p>
                <Link to="/login" state={location.state}>Login</Link>
            </form>
        </main>
    )
}

export default Register
