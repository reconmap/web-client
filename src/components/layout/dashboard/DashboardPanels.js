import React from 'react'
import UserActivityStatsWidget from "./UserActivityStatsWidget";
import VulnerabilitiesByRiskStatsWidget from "./VulnerabilitiesByRiskStatsWidget";
import VulnerabilitiesByCategoryStatsWidget from "./VulnerabilitiesByCategoryStatsWidget";
import Title from "../../ui/Title";
import {IconChartBar} from "../../ui/Icons";
import './DashboardPanels.scss'

function DashboardPanels() {
    return <section>
    <Title title="Statistics" type="Dashboard" icon={<IconChartBar/>}/>
    <div className='dashboard__panels'>
        <UserActivityStatsWidget/>
        <VulnerabilitiesByRiskStatsWidget/>
        <VulnerabilitiesByCategoryStatsWidget/>
    </div>

</section>
}

export default DashboardPanels
