import { Link } from 'react-router-dom';
import { ServerIssuesUrl, UserManualUrl } from 'ServerUrls';
import { AuthConsumer } from '../../contexts/AuthContext';
import NotificationsBadge from '../badges/NotificationsBadge';
import SearchBox from "../search/Box";
import LinkButton from '../ui/buttons/Link';
import HeaderUserMenu from '../ui/HeaderUserMenu';
import Configuration from '../../Configuration';
import './Header.scss';
import * as path from 'path';

const LINKS = [
    { title: "User Manual", to: { pathname: UserManualUrl } },
    { title: "Support", to: { pathname: ServerIssuesUrl } },
];

export default function Header() {

    return <AuthConsumer>
        {
            ({ isAuth, user }) => (
                <nav>
                    <Link to='/' style={{ cursor: 'pointer' }} className='logo'>
                        <h3>
                            <img alt='logo' src={ path.join(Configuration.appBasename, 'logo.svg') } />
                            <strong style={{ color: 'var(--white)' }} className='from-tablet'>
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

                    <div id='progress'></div>
                </nav>
            )
        }
    </AuthConsumer>
}
