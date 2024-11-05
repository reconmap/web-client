import SidemenuLayout from "components/layout/SidemenuLayout";
import { Outlet, useLocation } from "react-router-dom";

const SettingsLayout = ({ children }) => {
    const location = useLocation();
    const links = [
        { type: "label", name: "General", items: [] },
        {
            type: "menu",
            name: "Users",
            url: "/users",
            permissions: "settings.*",
            children: [{ name: "Create", url: "/users/create", permissions: "settings.*" }],
        },
        {
            type: "menu",
            name: "Organisations",
            url: "/settings/organisation",
        },
        {
            type: "menu",
            name: "Clients",
            url: "/clients",
        },
        { type: "label", name: "Configuration" },
        {
            type: "menu",
            name: "Custom fields",
            url: "/settings/custom-fields",
        },
        { type: "label", name: "Data" },
        {
            type: "menu",
            name: "Export data",
            url: "/system/export-data",
        },
        {
            type: "menu",
            name: "Import data",
            url: "/system/import-data",
        },
    ];
    return (
        <SidemenuLayout links={links}>
            <Outlet />
        </SidemenuLayout>
    );
};

export default SettingsLayout;
