import {Link } from 'react-router-dom'

import {AuthConsumer} from '../../contexts/AuthContext'

import BtnLink from './../ui/buttons/BtnLink'
import NotificationsBadge from '../badges/NotificationsBadge';
import SearchBox from "../search/Box";
import HeaderUserMenu from '../ui/HeaderUserMenu';

const LINKS = [
    {title: "Release notes", to: {pathname: "https://github.com/reconmap/application/releases"}},
    {title: "Support", to: {pathname: "https://github.com/reconmap/application/issues"}},
    {title: "User Manual", to: {pathname: "https://reconmap.org/user-manual/"}},
];

export default function Header() {
   
    return <AuthConsumer>
        {
            ({isAuth, user}) => (
                <nav>
                    <Link to='/' style={{paddingLeft: 'var(--padding)', cursor: 'pointer', marginRight:'auto'}}><h3 >
                        <strong style={{color: 'var(--white)'}}>Recon<span
                            style={{color: 'var(--primary-color)'}}>map</span></strong>
                    </h3>
                    </Link>
                    {isAuth ? <>
                            <SearchBox/>
                            <NotificationsBadge/>
                            {user && <HeaderUserMenu email={user.email}/>}
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
