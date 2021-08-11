import { Checkbox, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Loading from 'components/ui/Loading';
import Widgets from 'models/Widgets';
import React, { useEffect, useState } from 'react';
import widgetIsVisible from 'services/widgets';
import { IconChartBar } from "../../ui/Icons";
import Title from "../../ui/Title";
import './DashboardPanels.scss';
import WelcomeWidget from './widgets/WelcomeWidget';

const DashboardPanels = () => {

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
    }, []);

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
        <Tabs variant="enclosed">
            <TabList>
                <Tab>View</Tab>
                <Tab>Configure</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <div className='dashboard__panels'>
                        {visibleWidgets.length === 0 ? <WelcomeWidget /> : visibleWidgets}
                    </div>
                </TabPanel>
                <TabPanel>
                    <h4>Select which widgets to present in your dashboard</h4>
                    <br />
                    <Stack>
                        {Object.keys(Widgets).map(widgetKey => {
                            return <Checkbox key={widgetKey} name={widgetKey} isChecked={dashboardConfig.hasOwnProperty(widgetKey) && dashboardConfig[widgetKey].visible} onChange={onWidgetChange}>{Widgets[widgetKey].title}. <em>{Widgets[widgetKey].description}</em></Checkbox>
                        })}
                    </Stack>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </section>
}

export default DashboardPanels;
