import { Checkbox } from '@chakra-ui/react';
import Loading from 'components/ui/Loading';
import Tab from 'components/ui/Tab';
import Tabs from 'components/ui/Tabs';
import React, { useEffect, useMemo, useState } from 'react';
import widgetIsVisible from 'services/widgets';
import { IconChartBar } from "../../ui/Icons";
import Title from "../../ui/Title";
import './DashboardPanels.scss';
import MyTasksWidget from './widgets/MyTasksWidget';
import PopularCommandsWidget from './widgets/PopularCommandsWidget';
import RecentActivityWidget from './widgets/RecentActivityWidget';
import UserActivityStatsWidget from './widgets/UserActivityStatsWidget';
import VulnerabilitiesByCategoryStatsWidget from './widgets/VulnerabilitiesByCategoryStatsWidget';
import VulnerabilitiesByRiskStatsWidget from './widgets/VulnerabilitiesByRiskStatsWidget';
import WelcomeWidget from './widgets/WelcomeWidget';

const DashboardPanels = () => {
    const Widgets = useMemo(() => {
        return {
            'my-tasks': {
                title: 'My tasks', visible: true, component: <MyTasksWidget />
            },
            'vulnerability-by-risk-stats': {
                title: 'Vulnerability by risk', visible: true, component: <VulnerabilitiesByRiskStatsWidget />
            },
            'popular-commands': {
                title: 'Popular commands', visible: true, component: <PopularCommandsWidget />
            },
            'vulnerability-by-category-stats': {
                title: 'Vulnerability by category', visible: true, component: <VulnerabilitiesByCategoryStatsWidget />
            },
            'recent-activity': {
                title: 'Recent activity', visible: true, component: <RecentActivityWidget />
            },
            'user-activity-stats': {
                title: 'User activity over time', visible: true, component: <UserActivityStatsWidget />
            },
        }
    }, []);

    const [dashboardConfig, setDashboardConfig] = useState(null);

    const onWidgetChange = (ev) => {
        const dashboardConfigCopy = dashboardConfig;
        dashboardConfigCopy[ev.target.name].visible = ev.target.checked;

        localStorage.setItem('widget-config', JSON.stringify(dashboardConfigCopy));

        setDashboardConfig({ ...dashboardConfig, [ev.target.name]: { ...dashboardConfig[ev.target.name], visible: ev.target.checked } });
    }

    useEffect(() => {
        const localStorageConfig = localStorage.getItem('widget-config');
        let memoryConfig;
        if (localStorageConfig === null || localStorageConfig === undefined) {
            memoryConfig = Object.keys(Widgets).reduce((acc, key) => { acc[key] = { title: Widgets[key].title, visible: true }; return acc; }, {});
        } else {
            memoryConfig = JSON.parse(localStorageConfig);
        }
        setDashboardConfig(memoryConfig)
    }, [Widgets]);

    const visibleWidgets = Object.keys(Widgets).map((widgetKey) => {
        const widget = Widgets[widgetKey];
        if (widgetIsVisible(widgetKey)) {
            return widget.component;
        }
        return null;
    }).filter(widget => widget !== null);

    if (dashboardConfig === null) return <Loading />

    return <section>
        <Title type="Home" title="Dashboard" icon={<IconChartBar />} />
        <Tabs>
            <Tab name="View">
                <div className='dashboard__panels'>
                    {visibleWidgets.length === 0 ? <WelcomeWidget /> : visibleWidgets}
                </div>
            </Tab>
            <Tab name="Configure">
                <h4>Select which widgets to present in your dashboard</h4>
                <br />
                {Object.keys(dashboardConfig).map((widgetKey) => {
                    return <><Checkbox name={widgetKey} isChecked={dashboardConfig[widgetKey].visible} onChange={onWidgetChange}>{dashboardConfig[widgetKey].title}</Checkbox><br /></>
                })}
            </Tab>
        </Tabs>
    </section>
}

export default DashboardPanels;
