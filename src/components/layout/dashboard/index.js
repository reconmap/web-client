import Header from "../Header";
import Sidebar from "../sidebar";
import useSetTitle from "../../../hooks/useSetTitle";
import { useState } from "react";
import DashboardPanels from "./DashboardPanels";

function Dashboard({children}) {
    useSetTitle('Dashboard')
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    return (
        <>
            <Header/>
            <main role="main" className={sidebarCollapsed ? 'collapsed' : ''}>
                <Sidebar sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
                <div id='content'>
                    {children || <DashboardPanels/>}
                </div>
            </main>
        </>
    );
}

export default Dashboard;
