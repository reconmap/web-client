import path from 'path-browserify';
import { Link } from 'react-router-dom';
import { ServerIssuesUrl, UserManualUrl } from 'ServerUrls';
import Configuration from '../../Configuration';
import { AuthConsumer } from '../../contexts/AuthContext';
import NotificationsBadge from '../notifications/NotificationsBadge';
import SearchBox from "../search/Box";
import LinkButton from '../ui/buttons/Link';
import HeaderUserMenu from '../ui/HeaderUserMenu';
import './Header.scss';

const LINKS = [
    { title: "User Manual", to: { pathname: UserManualUrl } },
    { title: "Support", to: { pathname: ServerIssuesUrl } },
];

const Header = () => {
    return <AuthConsumer>
        {
            ({ isAuth, user }) => (
                <nav>
                    <Link to='/' style={{ cursor: 'pointer' }} className='logo'>
                        <h3>
                            <img alt='logo' src={path.join(Configuration.getContextPath(), 'logo.svg')} />
                            <strong style={{ color: 'var(--text-color)' }}>
                                Recon<span style={{ color: 'var(--primary-color)' }}>map</span>
                            </strong>
                        </h3>
                    </Link>
                    {isAuth ? <>
                        <SearchBox />
                        <NotificationsBadge />
                        {user && <HeaderUserMenu email={user.email} />}
                    </>
                        : LINKS.map((link, index) => (
                            <LinkButton external key={index} href={link.to.pathname}>
                                {link.title}
                            </LinkButton>))}
                </nav>
            )
        }
    </AuthConsumer>
}

export default Header;
