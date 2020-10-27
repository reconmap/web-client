import {useHistory} from 'react-router-dom'

import {AuthConsumer} from '../../contexts/AuthContext'

import BtnLink from './../ui/buttons/BtnLink'
import BtnSecondary from '../ui/buttons/BtnSecondary';
import UserAvatar from '../badges/UserAvatar';
import NotificationsBadge from '../badges/NotificationsBadge';
import { IconLogout } from '../icons';

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
                        <strong style={{ color : 'var(--white)'}}>Recon<span style={{ color : 'var(--primary-color)'}}>map</span></strong>
                    </h3>
                    {isAuth ? <>
                            <input placeholder="Search..." onKeyDown={handleSearchKeyDown}/>
                            <NotificationsBadge/>
                            {user && <UserAvatar onClick={handleMyProfile} email={user.email}/>}
                            <BtnSecondary onClick={logout}>
                                <IconLogout />
                                Logout
                             </BtnSecondary>
                        </>
                        : LINKS.map((link, index) => (
                            <BtnLink key={index} to={link.to.pathname}>
                                {link.title} 
                             </BtnLink>))}

                    <div id='progress'></div>
                </nav>
            )
        }
    </AuthConsumer>
}
