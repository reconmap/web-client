import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ServerIssuesUrl, UserManualUrl } from "ServerUrls";
import NotificationsBadge from "../notifications/NotificationsBadge";
import SearchBox from "../search/Box";
import LinkButton from "../ui/buttons/Link";
import HeaderUserMenu from "../ui/HeaderUserMenu";
import "./Header.css";
import HeaderLogo from "./HeaderLogo";

const LINKS = [
    { title: "User Manual", to: { pathname: UserManualUrl } },
    { title: "Support", to: { pathname: ServerIssuesUrl } },
];

const Header = () => {
    const { isAuth, user } = useContext(AuthContext);
    return (
        <nav className="navbar is-fixed-top">
            <div className="navbar-brand">
                <Link to="/" className="navbar-brand">
                    <HeaderLogo />
                </Link>
                <div className="navbar-burger js-burger" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="navbarExampleTransparentExample" className="navbar-menu">
                <div className="navbar-start"></div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="field is-grouped">
                            {isAuth ? (
                                <>
                                    <div className="control">
                                        <SearchBox />
                                    </div>
                                    <div className="control">
                                        <NotificationsBadge />
                                    </div>
                                    <div className="control">{user && <HeaderUserMenu email={user.email} />}</div>
                                </>
                            ) : (
                                LINKS.map((link, index) => (
                                    <LinkButton external key={index} href={link.to.pathname}>
                                        {link.title}
                                    </LinkButton>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
