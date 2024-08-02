function UserPin(userData) {

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


    return (
        <div className="userPin">
            <div className="splitSpace">
                <div className="profileSplit">
                    <div className="profileInfo">
                        <h1>username :</h1> <p>{userData.userData.username}</p>
                        <br />
                        <h1>email :</h1> <p> {userData.userData.email}</p>
                        <br />
                        {/* if bio exists its displayed, otherwise display message to add bio */}
                        <p>{userData.userData.bio ? userData.userData.bio : 'Add a bio on edit account page'}</p>
                    </div>
                </div>
                <div className="profileButtons">
                    <button>edit account -&gt; </button>
                    <button
                        onClick={handleLogout}

                    >logout -&gt; </button>
                </div>
            </div>


        </div >
    )
}

export default UserPin