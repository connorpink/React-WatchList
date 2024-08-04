//App.js
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MovieContext } from './tools/MovieContext';

import Layout from './Layout'
import { routes } from './routes'



function App() {

  const [movieData, setMovieData] = useState({}); // initialize context with an empty object

  useEffect(() => {
    fetchUserData()
  }, [])

  const [userData, setUserData] = useState({})

  function fetchUserData() {
    fetch('/server/user/info')
      .then((response) => {
        if (!response.ok) { throw new Error(`HTTP error, status: ${response.status}`) }
        return response.json()
      })
      .then(setUserData)
      .catch(error => {
        console.error("No user found", error)
        setUserData({ _id: "", username: "" })
      })
  }



  return (
    <BrowserRouter>
      <MovieContext.Provider value={{ movieData }}>

        <Routes>
          <Route element={<Layout userData={userData} />}>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Routes>
      </MovieContext.Provider>

    </BrowserRouter>
  )


}
export default App;