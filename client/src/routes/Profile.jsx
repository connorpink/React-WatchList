import '../styles/pins.css'
import UserPin from '../components/UserPin'
import { useAuth } from '../auth'

function Profile() {
    const { user } = useAuth();

    return (
        <main>
            <h1 className="center">Profile</h1>
            <div className='profile'>
                <UserPin userData={user} />
            </div>
        </main>
    )
}

export default Profile
