import { Outlet } from 'react-router-dom'
import Nav from './components/NavBar'



export default function Layout({ userData }) {


    return (
        <>
            <Nav userData={userData} />
            <Outlet />
        </>
    )
}
