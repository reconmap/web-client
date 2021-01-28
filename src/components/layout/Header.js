import {Link} from 'react-router-dom'
import {AuthConsumer} from '../../contexts/AuthContext'

import LinkButton from '../ui/buttons/Link'
import NotificationsBadge from '../badges/NotificationsBadge';
import SearchBox from "../search/Box";
import HeaderUserMenu from '../ui/HeaderUserMenu';
import './Header.scss';

const LINKS = [
    {title: "User Manual", to: {pathname: "https://reconmap.org/user-manual/"}},
    {title: "Support", to: {pathname: "https://github.com/reconmap/application/issues"}},
];

export default function Header() {

    return <AuthConsumer>
        {
            ({isAuth, user}) => (
                <nav>
                    <Link to='/' style={{cursor: 'pointer'}} className='logo'>
                        <h3>
                            <img alt='logo' src="/logo.svg" />
                            <strong style={{color: 'var(--white)'}} className='from-tablet'>
                                Recon<span style={{color: 'var(--primary-color)'}}>map</span>
                            </strong>
                        </h3>
                    </Link>
                    {isAuth ? <>
                            <SearchBox/>
                            <NotificationsBadge/>
                            {user && <HeaderUserMenu email={user.email}/>}
                        </>
                        : LINKS.map((link, index) => (
                            <LinkButton external key={index} href={link.to.pathname}>
                                {link.title}
                            </LinkButton>))}

                    <div id='progress'></div>
                </nav>
            )
        }
    </AuthConsumer>
}
