import React from "react";
import Header from "../Header";
import Sidebar from "../sidebar";
import useSetTitle from "../../../hooks/useSetTitle";
import UserActivityStatsWidget from "./UserActivityStatsWidget";
import VulnerabilitiesByRiskStatsWidget from "./VulnerabilitiesByRiskStatsWidget";
import VulnerabilitiesByCategoryStatsWidget from "./VulnerabilitiesByCategoryStatsWidget";
import Title from "../../ui/Title";

function Dashboard({children}) {
    useSetTitle('Dashboard')
    return (
        <>
            <Sidebar/>
            <div className="flex flex-col ml-16 md:ml-56 lg:ml-64">
                <Header/>
                <main role="main" className="px-5 w-full">
                    {children || <DashboardPanels/>}
                </main>
            </div>
        </>
    );
}

const DashboardPanels = () => {

    return <section>
        <Title title="Statistics" type="Dashboard"/>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3'>
            <UserActivityStatsWidget/>
            <VulnerabilitiesByRiskStatsWidget/>
            <VulnerabilitiesByCategoryStatsWidget/>
        </div>

    </section>
}

export default Dashboard;
