import PageTitle from "components/logic/PageTitle";
import { useState } from "react";
import Header from "../Header";
import Sidebar from "../sidebar";
import DashboardPanels from "./DashboardPanels";

const Dashboard = ({ children }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    return (
        <>
            <PageTitle value="Dashboard" />
            <Header />
            <main role="main" className={sidebarCollapsed ? 'collapsed' : ''}>
                <Sidebar sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
                <div id='content'>
                    {children || <DashboardPanels />}
                </div>
            </main>
        </>
    );
}

export default Dashboard;
