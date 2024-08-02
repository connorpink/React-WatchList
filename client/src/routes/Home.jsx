import axios from 'axios';
import { useEffect, useState } from "react";


export default function Home() {



    //data will be the string we send from our server
    const apiCall = () => {
        axios.get('http://localhost:4000').then((data) => {
            //this console.log will be in our frontend console
            console.log(data)
        })
    }

    const getUsers = () => {
        axios.get('http://localhost:4000/users/').then((data) => {
            //this console.log will be in our frontend console
            console.log(data)
        })
    }

    // const createNewUser = () => {
    //     axios.post('http://localhost:4000/users/', {
    //         "name": `${name}`,
    //         "email": `${email}`,
    //         "age": `${age}`,
    //     })
    //         .then((data) => {
    //             //this console.log will be in our frontend console
    //             console.log(data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    return (
        <div className="App">
            <header className="App-header">

                <button onClick={apiCall}>Make API Call</button>
                <button onClick={getUsers}>get users</button>
                <br />


            </header>
        </div >
    );


}