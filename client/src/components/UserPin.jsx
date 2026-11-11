import { useState } from "react";
import axios from 'axios';
import { useAuth } from "../auth";

function UserPin(userData) {
    const { setUser, refreshUser } = useAuth();
    const [userKey, setUserKey] = useState(userData.userData.TMDB_api_key);
    const [email, setEmail] = useState(userData.userData.email);
    const [userName, setUserName] = useState(userData.userData.username);

    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleLogout = () => {
        axios({ url: '/proxy/user/logout', method: "POST" })
            .then(response => {
                if (response.data.message == "success") setUser(null)
            })
            .catch(error => {
                setError(error);
            })
    };

    const updateAccount = async () => {
        try {
            const url = `/proxy/user/updateAccount`;
            const patchResponse = await axios({
                method: 'PATCH',
                url,
                data: {
                    TMDB_api_key: userKey,
                    email: email,
                    username: userName
                }
            })
            setError(null);
            setSuccessMessage(patchResponse.data.message === "success" ? "Account updated" : patchResponse.data.message);
            await refreshUser();
        } catch (error) {
            setError(error);
        }
    };

    const handleDelete = () => {
        if (!window.confirm("Delete your account and watch list? This can't be undone.")) return;
        axios({ url: '/proxy/user/delete', method: "DELETE" })
            .then(response => {
                if (response.data.message == "success") setUser(null)
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
                <button className="btn btn-success" onClick={updateAccount}>Update Account </button>
                {error ? (
                    <span style={{ color: "red" }}>Error: {error.message}</span>
                ) : successMessage ? (
                    <span style={{ color: "green" }}>{successMessage}</span>
                ) : (
                    <span />
                )}
            </div>

            <div className="profileButtons">

                <button className="btn btn-warning profileButton" onClick={handleLogout}> Logout </button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete Account </button>
            </div>

        </div >
    )
}

export default UserPin