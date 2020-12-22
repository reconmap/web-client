import {Link} from 'react-router-dom'

import {AuthConsumer} from '../../contexts/AuthContext'

import LinkButton from '../ui/buttons/Link'
import NotificationsBadge from '../badges/NotificationsBadge';
import SearchBox from "../search/Box";
import HeaderUserMenu from '../ui/HeaderUserMenu';

const LINKS = [
    {title: "User Manual", to: {pathname: "https://reconmap.org/user-manual/"}},
    {title: "Support", to: {pathname: "https://github.com/reconmap/application/issues"}},
];

export default function Header() {

    return <AuthConsumer>
        {
            ({isAuth, user}) => (
                <nav>
                    <Link to='/' style={{paddingLeft: 'var(--padding)', cursor: 'pointer', marginRight: 'auto'}}><h3>
                    <img alt='logo' src="/logo.svg" style={{ paddingRight:'var(--padding)' , width: 'var(--iconSizeLarge)'}}/>
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
                            <LinkButton external key={index} to={link.to.pathname}>
                                {link.title}
                            </LinkButton>))}

                    <div id='progress'></div>
                </nav>
            )
        }
    </AuthConsumer>
}
