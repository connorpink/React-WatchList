import { Outlet } from 'react-router-dom'
import Nav from './components/NavBar'
import Footer from './components/Footer';


export default function Layout({ userData }) {


    return (
        <>
            <Nav userData={userData} />
            <Outlet />
            <Footer />
        </>
    )
}
