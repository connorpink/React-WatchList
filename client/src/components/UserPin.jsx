import { useState } from "react";


function UserPin(userData) {
    // console.log(userData.userData.TMDB_api_key)
    const [userKey, setUserKey] = useState(userData.userData.TMDB_api_key);
    // handle logout function
    const handleLogout = () => {
        const postRequest = {
            method: 'POST'
        }
        fetch('server/user/logout', postRequest)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.message == "success") { location.assign('/') }
            })
            .catch(error => {
                console.error("unable to logout", error)
            })
    };

    //handle update account API key
    const updateAccount = () => {
        const patchRequest = {
            method: 'PATCH',
            body: JSON.stringify({
                TMDB_api_key: userKey,
            }),
            headers: { 'Content-Type': 'application/json' }
        }
        fetch('server/user/updateAccount', patchRequest)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.message == "success") {
                    window.location = '/';
                }
            })
    };

    return (
        <div className="userPin">
            <div className="profileInfo">
                <h1>username :</h1> <p>{userData.userData.username}</p>
                <br />
                <h1>email :</h1> <p> {userData.userData.email}</p>
                <br />
                <textarea rows="5" placeholder="enter your TMDB API key here" defaultValue={userData.userData.TMDB_api_key} onChange={(e) => setUserKey(e.target.value)} />
            </div>
            <div className="profileButtons">
                <button onClick={updateAccount}>update account -&gt; </button>
                <button
                    onClick={handleLogout}

                >logout -&gt; </button>
            </div>


        </div >
    )
}

export default UserPin