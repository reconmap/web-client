import {useHistory} from 'react-router-dom'

import {AuthConsumer} from '../../contexts/AuthContext'

import BtnLink from './../ui/buttons/BtnLink'
import BtnSecondary from '../ui/buttons/BtnSecondary';
import UserAvatar from '../badges/UserAvatar';
import NotificationsBadge from '../badges/NotificationsBadge';
import {IconLogout} from '../icons';
import SearchBox from "../search/Box";

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

    return <AuthConsumer>
        {
            ({isAuth, logout, user}) => (
                <nav>
                    <h3 onClick={handleGoHome} style={{paddingLeft: 'var(--padding)', cursor: 'pointer'}}>
                        <strong style={{color: 'var(--white)'}}>Recon<span
                            style={{color: 'var(--primary-color)'}}>map</span></strong>
                    </h3>
                    {isAuth ? <>
                            <SearchBox/>
                            <NotificationsBadge/>
                            {user && <UserAvatar onClick={handleMyProfile} email={user.email}/>}
                            <BtnSecondary onClick={logout}>
                                <IconLogout/>
                                Logout
                            </BtnSecondary>
                        </>
                        : LINKS.map((link, index) => (
                            <BtnLink external key={index} to={link.to.pathname}>
                                {link.title}
                            </BtnLink>))}

                    <div id='progress'></div>
                </nav>
            )
        }
    </AuthConsumer>
}
