import Home from './routes/Home';
import Error from './routes/Error';
import WatchList from "./routes/WatchList";
import Movie from "./routes/Movie";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Register from "./routes/Register";
import SearchResults from "./routes/SearchResults";

//import Login from './Login';

export const routes = [
    {
        path: '/',
        element: <Home />,
        errorElement: <Error />
    },
    {
        path: '/watchList',
        element: <WatchList />,
    },
    {
        path: '/movie/:movieid',
        element: <Movie />,
    },
    {
        path: '/search',
        element: <SearchResults />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
];

// export default routes;   
