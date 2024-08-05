//App.js
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './Layout'
import { routes } from './routes'



function App() {

  const [userData, setUserData] = useState({})

  useEffect(() => {
    fetchUserData()
  }, [])


  function fetchUserData() {
    fetch('/server/user/info')
      .then((response) => {
        if (!response.ok) { throw new Error(`HTTP error, status: ${response.status}`) }
        return response.json()
      })
      .then(setUserData)
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