import { useState } from "react";
import axios from 'axios';

import { SERVER_URL } from "../tools/ServerUrl"


function UserPin(userData) {
    // console.log(userData.userData.TMDB_api_key)
    const [userKey, setUserKey] = useState(userData.userData.TMDB_api_key);
    const [email, setEmail] = useState(userData.userData.email);
    const [userName, setUserName] = useState(userData.userData.username);

    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);


    // handle logout function
    const handleLogout = () => {
        axios({ baseURL: SERVER_URL, url: '/user/logout', method: "POST" })
            .then(response => {
                console.log(response.data)
                if (response.data.message == "success") { location.assign('/') }
            })
            .catch(error => {
                setError(error);
            })
    };

    //handle update account API key
    const updateAccount = async () => {
        try {
            const url = `/user/updateAccount`;
            const patchResponse = await axios({
                baseURL: SERVER_URL,
                method: 'PATCH',
                url,
                data: {
                    TMDB_api_key: userKey,
                    email: email,
                    username: userName
                }
            })
            console.log(patchResponse);

            setSuccessMessage(`${patchResponse.data.message}`);
            //redirect back to the watchList page
        } catch (error) {
            setError(error);
        }

    };

    // handle delete function
    const handleDelete = () => {
        axios({ baseUrl: SERVER_URL, url: '/user/delete', method: "DELETE" })
            .then(response => {
                // console.log(data);
                if (response.data.message == "success") { location.assign('/') }
            })
            .catch(error => {
                setError(error);
            })
    };

    return (
        <div className="userPin">
            <div className="profileInfo">
                <div className="fields">
                    <div className="userRow">
                        <h1>username </h1> <input type="text" defaultValue={userData.userData.username} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="userRow">
                        <h1>email </h1> <input type="text" defaultValue={userData.userData.email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <p>TMDB Api key </p><textarea rows="5" placeholder="enter your TMDB API key here" defaultValue={userData.userData.TMDB_api_key} onChange={(e) => setUserKey(e.target.value)} />
                <button className="btn btn-primary" onClick={updateAccount}>Update Account </button>
                {error ? (
                    <span style={{ color: "red" }}>Error: {error.message}</span>
                ) : successMessage ? (
                    <span style={{ color: "green" }}>{successMessage}</span>
                ) : (
                    <span />
                )}
            </div>

            <div className="profileButtons">

                <button className="btn btn-primary" onClick={handleLogout}> Logout </button>
                <button className="btn btn-primary" onClick={handleDelete}>Delete Account </button>
            </div>


        </div >
    )
}

export default UserPin