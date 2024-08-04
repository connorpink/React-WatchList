import React from 'react'
import ReactDOM from 'react-dom/client'
// import routes from './routes'
import App from './App.jsx'

import './styles/main.css'
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const router = createBrowserRouter(routes, {
//   basename: import.meta.env.BASE_URL,
// });

// local development
// const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
