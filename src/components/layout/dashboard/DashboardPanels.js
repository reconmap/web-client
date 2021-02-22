import React from 'react';
import { IconChartBar } from "../../ui/Icons";
import Title from "../../ui/Title";
import './DashboardPanels.scss';
import MyTasksWidget from './widgets/MyTasksWidget';
import PopularCommandsWidget from './widgets/PopularCommandsWidget';
import RecentActivityWidget from './widgets/RecentActivityWidget';
import UserActivityStatsWidget from './widgets/UserActivityStatsWidget';
import VulnerabilitiesByCategoryStatsWidget from './widgets/VulnerabilitiesByCategoryStatsWidget';
import VulnerabilitiesByRiskStatsWidget from './widgets/VulnerabilitiesByRiskStatsWidget';

const DashboardPanels = () => {
    return <section>
        <Title title="Statistics" type="Dashboard" icon={<IconChartBar />} />
        <div className='dashboard__panels'>
            <MyTasksWidget />
            <VulnerabilitiesByRiskStatsWidget />
            <PopularCommandsWidget />
            <VulnerabilitiesByCategoryStatsWidget />
            <RecentActivityWidget />
            <UserActivityStatsWidget />
        </div>
    </section>
}

export default DashboardPanels;
