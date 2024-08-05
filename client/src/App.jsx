//App.js
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios';

import Layout from './Layout'
import { routes } from './routes'



function App() {

  const [userData, setUserData] = useState({})

  useEffect(() => {
    fetchUserData()
  }, [])


  function fetchUserData() {
    axios({ baseURL: "http://3.22.216.215:4000", method: "GET", url: '/user/info' })
      .then((response) => {
        if (!response.statusText == "OK") { throw new Error(`HTTP error, status: ${response.status}`) }
        setUserData(response.data);
      })
      .catch(() => {
        setUserData({ _id: "", username: "" })

      });
  }



  return (
    <BrowserRouter>

      <Routes>
        <Route element={<Layout userData={userData} />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>

    </BrowserRouter>
  )


}
export default App;