import Home from './routes/Home';
import Error from './routes/Error';
import WatchList from "./routes/WatchList";
import Movie from "./routes/Movie";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Register from "./routes/Register";
import SearchResults from "./routes/SearchResults";
import WatchListEntry from "./routes/WatchListEntry";

export const routes = [
    { path: '/', element: <Home />, auth: "required" },
    { path: '/watchList', element: <WatchList />, auth: "required" },
    { path: '/watchListEntry/:movieid', element: <WatchListEntry />, auth: "required" },
    { path: '/movie/:movieid', element: <Movie />, auth: "required" },
    { path: '/search', element: <SearchResults />, auth: "required" },
    { path: '/profile', element: <Profile />, auth: "required" },
    { path: '/login', element: <Login />, auth: "guest" },
    { path: '/register', element: <Register />, auth: "guest" },
    { path: '*', element: <Error /> },
];
