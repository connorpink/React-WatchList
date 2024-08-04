import '../styles/pins.css'


import React, { useEffect, useState } from 'react'
import UserPin from '../components/UserPin'

function Profile() {

    // function to fetch user data from server
    useEffect(() => {
        fetchUserData()
    }, [])

    // state to store user data
    const [userData, setUserData] = useState({})
    // function to fetch user data from server
    function fetchUserData() {
        fetch('/server/user/info')
            .then((response) => {
                if (!response.ok) { throw new Error(`HTTP error, status: ${response.status}`) }
                return response.json()
            })
            .then(setUserData)
            .catch(error => {
                console.error("No user found", error)
                setUserData({ _id: "", username: "", email: "" })
            })
    }
    // output user data for testing
    console.log('userData', userData)



    return (

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
    )
}

export default Profile