import { Outlet } from 'react-router-dom'
import { useContext } from 'react';
import Nav from './components/NavBar'
import { MovieContext } from './tools/MovieContext';



export default function Layout({ userData }) {
    const movieData = useContext(MovieContext);

    // console.log('movieData in Layout:', movieData); // testing

    const backdropPath = movieData.backdrop_path;
    // console.log('backdropPath:', backdropPath); // testing

    return (
        <>
            <header />
            <Nav userData={userData} />
            <main style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})` }}>
                <Outlet />
            </main>
        </>
    )
}
