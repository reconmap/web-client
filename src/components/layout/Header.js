import { Link } from 'react-router-dom';
import { ServerIssuesUrl, UserManualUrl } from 'ServerUrls';
import { AuthConsumer } from '../../contexts/AuthContext';
import NotificationsBadge from '../notifications/NotificationsBadge';
import SearchBox from "../search/Box";
import LinkButton from '../ui/buttons/Link';
import HeaderUserMenu from '../ui/HeaderUserMenu';
import './Header.scss';
import HeaderLogo from './HeaderLogo';

const LINKS = [
    { title: "User Manual", to: { pathname: UserManualUrl } },
    { title: "Support", to: { pathname: ServerIssuesUrl } },
];

const Header = () => {
    return <AuthConsumer>{
        ({ isAuth, user }) => (
            <nav>
                <Link to='/' className="logo">
                    <HeaderLogo />
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
