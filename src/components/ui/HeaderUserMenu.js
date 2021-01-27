import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {AuthConsumer} from '../../contexts/AuthContext'
import UserAvatar from './../badges/UserAvatar'
import './HeaderUserMenu.scss'
export default function HeaderUserMenu({email}) {

    const [showWindow, setShowWindow] = useState(false)
    const handleShowWindow = () => {
        setShowWindow(!showWindow)
        setTimeout(() => {
            setShowWindow(false)
        }, 60000)
    }

    return (
        <div style={{position: 'relative'}}>
            <UserAvatar onClick={handleShowWindow} email={email}/>
            {showWindow && <UserMenu/>}
        </div>
    )
}


const UserMenu = () => {
    return <AuthConsumer>
        {({logout}) =>
            <div className='HeaderUserMenu'>
                <h5>User</h5>
                <Link to={`/users/${localStorage.getItem('user.id')}`}>Your profile</Link>
                <Link to='/users/preferences'>Preferences</Link>
                <Link to='/users/password-change'>Change password</Link>
                <hr style={{borderColor: 'var(--bg-color)'}}/>
                <h5>Organisation</h5>
                <Link to='/organisation'>Settings</Link>
                <hr style={{borderColor: 'var(--bg-color)'}}/>
                <Link to='/' onClick={logout}>Logout</Link>
            </div>
        }
    </AuthConsumer>
}
