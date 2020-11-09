import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthConsumer } from '../../contexts/AuthContext'
import UserAvatar from './../badges/UserAvatar'
export default function HeaderUserMenu({email}) {

    const [showWindow, setShowWindow] = useState(false)
    const handleShowWindow = () => {
        setShowWindow(!showWindow)
        setTimeout(() => {
            setShowWindow(false)
        }, 60000)
    }

    return (
        <div style={{ position: 'relative' }}>
        
        <UserAvatar onClick={handleShowWindow} email={email}/>
                    {showWindow && <UserMenu />}
        </div>
    )
}


const UserMenu = () => {
  
    const styles = {
        useMenu: {
            position: 'absolute',
            padding: 'var(--paddingBox)',
            borderRadius: 'var(--borderRadius)',
            backgroundColor: 'var(--black)',
            color: 'var(--text-color)',
            top: '40px',
            // left: '-70px',
            right: 0,
            margin: 'auto',
            width: '180px',
            zIndex: 10,
            fontSize: 'var(--fontSizeSmall)',
            display: 'flex',
            rowGap : 'var(--margin)',
            flexDirection: 'column',
            textAlign:'right'

        },

    }

    return <AuthConsumer>
                {({logout}) => 
                    <div style={styles.useMenu}>
                        <Link to={`/users/${localStorage.getItem('user.id')}`}>My profile</Link>
                        <Link to='/users/preferences'>Preferences</Link>
                        <Link to='/users/password-change'>Change password</Link>
                        <hr style={{ borderColor:'var(--bg-color)' }}/>
                        <Link to='/' onClick={logout}>Logout</Link>
                    </div>
                }
            </AuthConsumer>
}
