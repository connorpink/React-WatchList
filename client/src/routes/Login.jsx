/* eslint-disable react/no-unknown-property */
import '../styles/login.css'
import '../styles/forms.css'
import React, { useRef, useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import axios from 'axios';

function Login() {
    const errorRef = useRef()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(() => {
        setErrorMessage("");
    }, [username, password])


    function attemptLogin() {


        if (!username) { setErrorMessage("no username given") }
        else if (!password) { setErrorMessage("no password given") }
        else {
            const postRequest = {
                method: 'POST',
                url: "/proxy/user/login",
                headers: { 'Content-type': 'application/json; charset=UTF-8', },
                data: {
                    username: username,
                    password: password,
                }
            }

            axios(postRequest)
                .then(response => {
                    console.log(response.data)
                    if (response.data.message == "badUser") { setErrorMessage("Username not found") }
                    if (response.data.message == "badPass") { setErrorMessage("Password incorrect") }
                    if (response.data.message == "success") { location.assign('/') }
                })
        }
    }

    return (
        <main>
            <div className="loginForm" id="loginForm">
                <h1>Login</h1>
                <div className="textInput">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder=' '
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        onKeyDown={(event) => { if (event.key === 'Enter') { attemptLogin() } }}
                    />
                    <label htmlFor="username">Username</label>
                </div>

                <div className="textInput">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder=' '
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => { if (event.key === 'Enter') { attemptLogin() } }}
                    />
                    <label htmlFor="password">Password</label>
                </div>

                <div className="splitSpace">
                    <div className="checkboxInput">
                        <input type="checkbox"
                            name="remember me"
                            id="remember"
                            value="1" />
                        <label htmlFor="remember">Remember Me</label>
                    </div>
                </div>

                <button
                    name="Submit"
                    type="submit"
                    id="submitButton"
                    onClick={attemptLogin}
                > Login </button>
                <p ref={errorRef} className={errorMessage ? "error" : "hidden"} area-live="assertive">{errorMessage}</p>
                <p>Don&apos;t have an account?</p>
                {/* <a href='/register'>create account</a> */}
                <Link to={`/register`} > Create account</Link>

            </div>
        </main>
    )
}

export default Login