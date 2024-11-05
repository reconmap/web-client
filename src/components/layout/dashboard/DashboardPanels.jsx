import NativeButton from "components/form/NativeButton";
import NativeCheckbox from "components/form/NativeCheckbox";
import NativeTabs from "components/form/NativeTabs";
import Loading from "components/ui/Loading";
import { actionCompletedToast } from "components/ui/toast";
import { useAuth } from "contexts/AuthContext";
import useDocumentTitle from "hooks/useDocumentTitle";
import Widgets from "models/Widgets";
import React, { useState } from "react";
import secureApiFetch from "services/api";
import PermissionsService from "services/permissions";
import { initialiseUserPreferences } from "services/userPreferences";
import widgetIsVisible from "services/widgets";
import { IconChartBar } from "../../ui/Icons";
import Title from "../../ui/Title";
import WelcomeWidget from "./widgets/WelcomeWidget";

const InitialiseWidgetConfig = () => {
    return Object.keys(Widgets).reduce((acc, key) => {
        acc[key] = { visible: true };
        return acc;
    }, {});
};

const filterWidgets = (user) => {
    return Object.keys(Widgets)
        .map((widgetKey) => {
            const widget = Widgets[widgetKey];
            if (
                (!widget.hasOwnProperty("permissions") ||
                    PermissionsService.isAllowed(widget.permissions, user.permissions)) &&
                widgetIsVisible(user.preferences["web-client.widgets"], widgetKey)
            ) {
                return React.cloneElement(widget.component, { key: widgetKey });
            }
            return null;
        })
        .filter((widget) => widget !== null);
};

const DashboardPanels = () => {
    const { user } = useAuth();
    user.preferences = initialiseUserPreferences(user);
    const [dashboardConfig, setDashboardConfig] = useState(
        user?.preferences?.["web-client.widgets"] || InitialiseWidgetConfig(),
    );
    const [visibleWidgets, setVisibleWidgets] = useState(filterWidgets(user));

    const [tabIndex, tabIndexSetter] = useState(0);

    const onWidgetChange = (ev) => {
        setDashboardConfig((prev) => ({
            ...prev,
            [ev.target.name]: { ...prev[ev.target.name], visible: ev.target.checked },
        }));
    };

    const onSave = (ev, loggedInUser) => {
        const user = loggedInUser;
        user.preferences = initialiseUserPreferences(user);

        user.preferences["web-client.widgets"] = dashboardConfig;

        secureApiFetch(`/users/${user.id}`, {
            method: "PATCH",
            body: JSON.stringify({ preferences: user.preferences }),
        })
            .then(() => {
                localStorage.setItem("user", JSON.stringify(user));

                setVisibleWidgets(filterWidgets(user));

                actionCompletedToast("Your preferences have been saved.");
            })
            .catch((err) => console.error(err));
    };

    useDocumentTitle("Dashboard");

    if (dashboardConfig === null) return <Loading />;

    return (
        <section>
            <Title type="Home" title="Dashboard" icon={<IconChartBar />} />
            <div>
                <NativeTabs labels={["View", "Configure"]} tabIndex={tabIndex} tabIndexSetter={tabIndexSetter} />

                {0 === tabIndex && (
                    <div>
                        <div className="fixed-grid has-3-cols">
                            <div className="grid">
                                {visibleWidgets.length === 0 ? <WelcomeWidget /> : visibleWidgets}
                            </div>
                        </div>
                    </div>
                )}
                {1 === tabIndex && (
                    <div>
                        <h4>Select which widgets to present in your dashboard</h4>
                        <br />
                        <div className="field">
                            {Object.keys(Widgets).map((widgetKey) => {
                                const widget = Widgets[widgetKey];
                                if (
                                    !widget.hasOwnProperty("permissions") ||
                                    PermissionsService.isAllowed(widget.permissions, user.permissions)
                                ) {
                                    return (
                                        <NativeCheckbox
                                            key={widgetKey}
                                            name={widgetKey}
                                            checked={
                                                dashboardConfig.hasOwnProperty(widgetKey) &&
                                                dashboardConfig[widgetKey].visible
                                            }
                                            onChange={onWidgetChange}
                                        >
                                            {Widgets[widgetKey].title}. <em>{Widgets[widgetKey].description}</em>
                                        </NativeCheckbox>
                                    );
                                } else {
                                    return <></>;
                                }
                            })}
                        </div>
                        <NativeButton onClick={(ev) => onSave(ev, user)}>Save</NativeButton>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DashboardPanels;
