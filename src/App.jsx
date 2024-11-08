import Compose from "components/Compose";
import DashboardRoutes from "components/layout/dashboard/Routes";
import NotificationsRoutes from "components/notifications/Routes";
import SettingsRoutes from "components/settings/Routes";
import WebsocketProvider from "contexts/WebsocketContext";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Configuration from "./Configuration";
import ClientsRoutes from "./components/clients/Routes";
import CommandsRoutes from "./components/commands/Routes";
import DocumentsRoutes from "./components/documents/Routes";
import DashboardLayout from "./components/layout/DashboardLayout";
import PageNotFound from "./components/layout/dashboard/PageNotFound";
import ProjectsRoutes from "./components/projects/Routes";
import ProjectTemplatesRoutes from "./components/projects/templates/Routes";
import ReportsRoutes from "./components/reports/Routes";
import ReportTemplatesRoutes from "./components/reports/templates/Routes";
import SearchRoutes from "./components/search/Routes";
import SupportRoutes from "./components/support/Routes";
import SystemRoutes from "./components/system/Routes";
import TargetRoutes from "./components/target/Routes";
import TasksRoutes from "./components/tasks/Routes";
import UsersRoutes from "./components/users/Routes";
import VulnerabilitiesRoutes from "./components/vulnerabilities/Routes";
import VulnerabilityCategoriesRoutes from "./components/vulnerabilities/categories/Routes";
import VulnerabilityTemplatesRoutes from "./components/vulnerabilities/templates/Routes";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const App = () => {
    const { user } = useAuth();

    return (
        <BrowserRouter basename={Configuration.getContextPath()}>
            {/* Order of provider components matters */}
            <Compose components={[AuthProvider, WebsocketProvider]}>
                <Routes>
                    <Route element={<DashboardLayout />}>
                        {[
                            ...DashboardRoutes,
                            ...ClientsRoutes,
                            ...CommandsRoutes,
                            ...DocumentsRoutes,
                            ...ProjectTemplatesRoutes,
                            ...ProjectsRoutes,
                            ...ReportTemplatesRoutes,
                            ...ReportsRoutes,
                            ...NotificationsRoutes,
                            ...SearchRoutes,
                            ...SettingsRoutes,
                            ...SupportRoutes,
                            ...SystemRoutes,
                            ...TargetRoutes,
                            ...TasksRoutes,
                            ...UsersRoutes,
                            ...VulnerabilitiesRoutes,
                            ...VulnerabilityCategoriesRoutes,
                            ...VulnerabilityTemplatesRoutes,
                        ].map((value, index) => React.cloneElement(value, { key: `protected_route_${index}` }))}
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Routes>
            </Compose>
        </BrowserRouter>
    );
};

export default App;
