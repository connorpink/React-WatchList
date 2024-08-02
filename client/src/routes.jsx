import Home from './routes/Home';
import Error from './routes/Error';
import Projects from "./routes/Projects";
import Project from "./routes/Project";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Register from "./routes/Register";

//import Login from './Login';

export const routes = [
    {
        path: '/',
        element: <Home />,
        errorElement: <Error />
    },
    {
        path: '/projects',
        element: <Projects />,
    },


    {
        path: '/project/:projectid',
        element: <Project />,
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
