import '../styles/pins.css'
import axios from 'axios';


import React, { useEffect, useState } from 'react'
import UserPin from '../components/UserPin'
import { SERVER_URL } from "../tools/ServerUrl"

function Profile() {

    // function to fetch user data from server
    useEffect(() => {
        fetchUserData()
    }, [])

    // state to store user data
    const [userData, setUserData] = useState({})
    // function to fetch user data from server
    function fetchUserData() {
        axios({ baseURL: SERVER_URL, url: '/user/info', method: "GET" })
            .then((response) => {
                if (!response.statusText == "OK") { throw new Error(`HTTP error, status ${response.status}`) }
                setUserData(response.data);
            })
            .catch(error => {
                console.error("No user found", error)
                setUserData({ _id: "", username: "", email: "" })
            })
    }
    // output user data for testing
    console.log('userData', userData)



    return (
        <main>
            <h1 className="center">Profile</h1>

            <div className='profile'>
                {
                    userData._id != "" ?
                        <>
                            <UserPin userData={userData} />
                        </> : <>
                            <h3>You are not logged in...</h3>
                        </>
                }
            </div >
        </main>
    )
}

export default Profile