import Header from "../Header";
import Sidebar from "../sidebar";
import useSetTitle from "../../../hooks/useSetTitle";
import UserActivityStatsWidget from "./UserActivityStatsWidget";
import VulnerabilitiesByRiskStatsWidget from "./VulnerabilitiesByRiskStatsWidget";
import VulnerabilitiesByCategoryStatsWidget from "./VulnerabilitiesByCategoryStatsWidget";
import Title from "../../ui/Title";
import {IconChartBar} from "../../ui/Icons";
import { useState } from "react";

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

const DashboardPanels = () => {

    return <section>
        <Title title="Statistics" type="Dashboard" icon={<IconChartBar/>}/>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3'>
            <UserActivityStatsWidget/>
            <VulnerabilitiesByRiskStatsWidget/>
            <VulnerabilitiesByCategoryStatsWidget/>
        </div>

    </section>
}

export default Dashboard;
