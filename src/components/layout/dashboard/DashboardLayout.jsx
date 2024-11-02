import PageTitle from "components/logic/PageTitle";
import KeyboardShortcuts from "components/support/KeyboardShortcuts";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../sidebar";

const DashboardLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <>
            <PageTitle value="Dashboard" />
            <Header />
            <main role="main" className={sidebarCollapsed ? "collapsed" : ""}>
                <Sidebar sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
                <div id="content">
                    <Outlet />
                </div>
            </main>
            <KeyboardShortcuts />
        </>
    );
};

export default DashboardLayout;
