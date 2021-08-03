import { Checkbox, Stack } from '@chakra-ui/react';
import Loading from 'components/ui/Loading';
import Tab from 'components/ui/Tab';
import Tabs from 'components/ui/Tabs';
import React, { useEffect, useMemo, useState } from 'react';
import widgetIsVisible from 'services/widgets';
import { IconChartBar } from "../../ui/Icons";
import Title from "../../ui/Title";
import './DashboardPanels.scss';
import ActiveProjectsWidget from './widgets/ActiveProjectsWidget';
import MyTasksWidget from './widgets/MyTasksWidget';
import PopularCommandsWidget from './widgets/PopularCommandsWidget';
import RecentActivityWidget from './widgets/RecentActivityWidget';
import RecentDocumentsWidget from './widgets/RecentDocumentsWidget';
import UserActivityStatsWidget from './widgets/UserActivityStatsWidget';
import VulnerabilitiesByCategoryStatsWidget from './widgets/VulnerabilitiesByCategoryStatsWidget';
import VulnerabilitiesByRiskStatsWidget from './widgets/VulnerabilitiesByRiskStatsWidget';
import WelcomeWidget from './widgets/WelcomeWidget';

const DashboardPanels = () => {
    const Widgets = useMemo(() => {
        return {
            'my-tasks': {
                title: 'My tasks',
                description: 'It shows a list of all open tasks assigned to you.',
                visible: true,
                component: <MyTasksWidget />
            },
            'vulnerability-by-risk-stats': {
                title: 'Vulnerability by risk',
                visible: true,
                component: <VulnerabilitiesByRiskStatsWidget />
            },
            'active-projects': {
                title: 'Active projects',
                visible: true,
                component: <ActiveProjectsWidget />,
                description: 'It shows a list of all non-archived projects.'
            },
            'popular-commands': {
                title: 'Popular commands',
                visible: true,
                component: <PopularCommandsWidget />
            },
            'recent-documents': {
                title: 'Recent documents',
                visible: true,
                component: <RecentDocumentsWidget />,
                description: 'It shows a list of the most recent documents.'
            },
            'vulnerability-by-category-stats': {
                title: 'Vulnerability by category',
                visible: true,
                component: <VulnerabilitiesByCategoryStatsWidget />
            },
            'recent-activity': {
                title: 'Recent activity',
                visible: true,
                component: <RecentActivityWidget />
            },
            'user-activity-stats': {
                title: 'User activity over time',
                visible: true,
                component: <UserActivityStatsWidget />
            },
        }
    }, []);

    const [dashboardConfig, setDashboardConfig] = useState(null);

    const onWidgetChange = (ev) => {
        const dashboardConfigCopy = dashboardConfig;
        dashboardConfigCopy[ev.target.name] = { visible: ev.target.checked };

        localStorage.setItem('widget-config', JSON.stringify(dashboardConfigCopy));

        setDashboardConfig({ ...dashboardConfig, [ev.target.name]: { ...dashboardConfig[ev.target.name], visible: ev.target.checked } });
    }

    useEffect(() => {
        const localStorageConfig = localStorage.getItem('widget-config');
        let memoryConfig;
        if (localStorageConfig === null || localStorageConfig === undefined) {
            memoryConfig = Object.keys(Widgets).reduce((acc, key) => {
                acc[key] = { visible: true };
                return acc;
            }, {});
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
            <Tab key="view_tab" name="View">
                <div className='dashboard__panels'>
                    {visibleWidgets.length === 0 ? <WelcomeWidget /> : visibleWidgets}
                </div>
            </Tab>
            <Tab key="configure_tab" name="Configure">
                <h4>Select which widgets to present in your dashboard</h4>
                <br />
                <Stack>
                    {Object.keys(Widgets).map(widgetKey => {
                        return <Checkbox key={widgetKey} name={widgetKey} isChecked={dashboardConfig.hasOwnProperty(widgetKey) && dashboardConfig[widgetKey].visible} onChange={onWidgetChange}>{Widgets[widgetKey].title}. <em>{Widgets[widgetKey].description}</em></Checkbox>
                    })}
                </Stack>
            </Tab>
        </Tabs>
    </section>
}

export default DashboardPanels;
