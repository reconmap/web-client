import KeyboardShortcuts from "components/support/KeyboardShortcuts";
import { Outlet } from "react-router-dom";
import Header from "../Header";

const DashboardLayout = () => {
    return (
        <>
            <Header />
            <main role="main">
                <div id="content">
                    <Outlet />
                </div>
            </main>
            <KeyboardShortcuts />
        </>
    );
};

export default DashboardLayout;
