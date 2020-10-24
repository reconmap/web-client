import {useHistory} from 'react-router-dom'

import {AuthConsumer} from '../../contexts/AuthContext'

import BtnLink from './../ui/buttons/BtnLink'
import BtnSecondary from '../ui/buttons/BtnSecondary';
import UserAvatar from '../badges/UserAvatar';
import NotificationsBadge from '../badges/NotificationsBadge';

const LINKS = [
    {title: "Release notes", to: {pathname: "https://github.com/reconmap/application/releases"}},
    {title: "Support", to: {pathname: "https://github.com/reconmap/application/issues"}},
    {title: "User Manual", to: {pathname: "https://reconmap.org/user-manual/"}},
];

export default function Header() {
    const history = useHistory()
    const handleGoHome = () => {
           history.push('/')
       }
    const handleMyProfile = () => {
        history.push(`/users/${localStorage.getItem('user.id')}`)
    }

    const handleOpenPrefs = () => {
        history.push('/users/preferences')
    }

    const handleUserManual = () => {
        window.open("https://reconmap.org/user-manual/", '_blank');
    }

    const handleSearchKeyDown = e => {
        if (e.key === 'Enter') {
            history.push('/search/' + encodeURIComponent(e.target.value));
        }
    }

    return <AuthConsumer>
        {
            ({isAuth, logout, user}) => (
                <nav>
                    <h3 onClick={handleGoHome} style={{ paddingLeft:'var(--padding)', cursor:'pointer'}}>
                        {/* <img src="/logo.svg" height='32px' width='32px' className='mr-2 mt-1' alt="Reconmap logo"/> */}
                        <span>Recon<strong style={{ color : 'var(--primary-color)'}}>map</strong></span>
                    </h3>
                    {isAuth ? <div>
                            <input placeholder="Search..." onKeyDown={handleSearchKeyDown}/>
                            <BtnLink onClick={handleUserManual}>User manual</BtnLink>
                            <BtnLink onClick={handleOpenPrefs}>Preferences</BtnLink>
                            <NotificationsBadge/>
                            {user && <UserAvatar onClick={handleMyProfile} size={8} email={user.email}/>}
                            <span className='w-2'> </span>
                            <BtnSecondary onClick={logout}> Logout</BtnSecondary>
                        </div>
                        : LINKS.map((link, index) => (
                            <BtnLink  key={index} to={link.to.pathname}> {link.title} </BtnLink>))}
                </nav>
            )
        }
    </AuthConsumer>
}
