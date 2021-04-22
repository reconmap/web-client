import RestrictedComponent from 'components/logic/RestrictedComponent'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthConsumer } from '../../contexts/AuthContext'
import UserAvatar from './../badges/UserAvatar'
import './HeaderUserMenu.scss'

export default function HeaderUserMenu({ email }) {

    const [showWindow, setShowWindow] = useState(false)
    const handleShowWindow = () => {
        setShowWindow(!showWindow)
        setTimeout(() => {
            setShowWindow(false)
        }, 10000)
    }

    return (
        <div style={{ position: 'relative' }}>
            <UserAvatar onClick={handleShowWindow} email={email} />
            {showWindow && <UserMenu />}
        </div>
    )
}


const UserMenu = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return <AuthConsumer>
        {({ logout }) =>
            <div className='HeaderUserMenu'>
                <h4 style={{ marginTop: 0, padding: 0, color: '#cfcfcf', fontWeight: 'bold' }}>{user.full_name}</h4>
                <h5>User</h5>
                <Link to={`/users/${user.id}`}>Your profile</Link>
                <Link to='/users/preferences'>Preferences</Link>
                <Link to='/users/password-change'>Change password</Link>
                <hr style={{ borderColor: 'var(--bg-color)' }} />
                <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                    <h5>Organisation</h5>
                    <Link to='/organisation'>Settings</Link>
                    <hr style={{ borderColor: 'var(--bg-color)' }} />
                </RestrictedComponent>
                <Link to='/' onClick={logout}>Logout</Link>
            </div>
        }
    </AuthConsumer>
}
