import SearchUrls from "components/search/SearchUrls";
import ExternalLink from "components/ui/ExternalLink";
import Configuration from "Configuration";
import { AuthContext } from "contexts/AuthContext";
import { t } from "i18next";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ServerIssuesUrl, UserManualUrl } from "ServerUrls";
import NotificationsBadge from "../notifications/NotificationsBadge";
import SearchBox from "../search/Box";
import HeaderUserMenu from "../ui/HeaderUserMenu";
import { DashboardUrls } from "./dashboard/Routes";
import HeaderLogo from "./HeaderLogo";

const MenuLinks = [
    {
        name: t("Projects"),
        items: [{ name: t("List"), url: "/projects" }, null, { name: t("Tasks"), url: "/tasks" }],
    },
    {
        name: t("Library"),
        items: [
            { name: t("Commands"), url: "/commands", permissions: "commands.*" },
            { name: t("Vulnerabilities"), url: "/vulnerabilities", permissions: "commands.*" },
            { name: t("Documents"), url: "/documents", permissions: "documents.*" },
        ],
    },
    {
        name: t("Settings"),
        items: [
            { name: t("Users"), url: "/users" },
            { name: t("Custom fields"), url: "/settings/custom-fields" },
            { name: t("Search"), url: SearchUrls.AdvancedSearch },
            { name: t("Import data"), url: "/system/import-data" },
            { name: t("Export data"), url: "/system/export-data" },
        ],
    },
    {
        name: t("Help & Support"),
        items: [
            { name: t("User manual"), url: UserManualUrl, external: true },
            { name: t("API docs"), url: `${Configuration.getDefaultApiUrl()}/docs/`, external: true },
            { name: t("Support info"), url: "/support" },
            { name: t("System health"), url: "/system/health" },
            null,
            { name: t("Audit log"), url: "/auditlog" },
            { name: t("Licenses"), url: "/licenses" },
            { name: t("Integrations"), url: "/system/integrations" },
            { name: t("System usage"), url: "/system/usage" },
            null,
            { name: t("Log issue"), url: ServerIssuesUrl, external: true },
        ],
    },
];

const Header = () => {
    const [t] = useTranslation();
    const { user } = useContext(AuthContext);
    const [activeMenu, setActiveMenu] = useState(null);

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
                <div className="navbar-start">
                    <Link className="navbar-item" to={DashboardUrls.DEFAULT}>
                        {t("Dashboard")}
                    </Link>
                    {MenuLinks.map((menuLink) => {
                        return (
                            <div
                                key={menuLink.name}
                                className={`navbar-item has-dropdown ${activeMenu === menuLink.name ? "is-active" : ""}`}
                            >
                                <a
                                    className="navbar-link"
                                    href="#"
                                    onClick={() => setActiveMenu(activeMenu === menuLink.name ? null : menuLink.name)}
                                >
                                    {menuLink.name}
                                </a>
                                <div className="navbar-dropdown is-boxed">
                                    {menuLink.items.map((item) => {
                                        return null === item ? (
                                            <hr className="navbar-divider" />
                                        ) : item.hasOwnProperty("external") ? (
                                            <div className="navbar-item">
                                                <ExternalLink href={item.url}>{item.name}</ExternalLink>
                                            </div>
                                        ) : (
                                            <Link
                                                className="navbar-item"
                                                to={item.url}
                                                onClick={() => setActiveMenu(null)}
                                            >
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="field is-grouped">
                            <div className="control">
                                <SearchBox />
                            </div>
                            <div className="control">
                                <NotificationsBadge />
                            </div>
                            <div className="control">{user && <HeaderUserMenu email={user.email} />}</div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
