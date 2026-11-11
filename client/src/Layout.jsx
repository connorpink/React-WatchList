import { Outlet } from 'react-router-dom'
import Nav from './components/NavBar'
import Footer from './components/Footer';

export default function Layout() {
    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    )
}
