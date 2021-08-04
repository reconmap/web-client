import AuthRoutes from 'components/auth/Routes';
import CommandsRoutes from 'components/commands/Routes';
import DocumentsRoutes from 'components/documents/Routes';
import SearchRoutes from 'components/search/Routes';
import SupportRoutes from 'components/support/Routes';
import TargetsRoutes from 'components/target/Routes';
import VulnerabilityTemplatesRoutes from 'components/vulnerabilities/templates/Routes';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuditLogList from "./components/auditlog/List";
import ClientsRoutes from "./components/clients/Routes";
import IntegrationsList from "./components/integrations/List";
import Dashboard from "./components/layout/dashboard";
import PageNotFound from "./components/layout/dashboard/PageNotFound";
import ProtectedRoute from "./components/logic/ProtectedRoute";
import OrganisationRoutes from "./components/organisation/Routes";
import ProjectsRoutes from "./components/projects/Routes";
import ProjectTemplatesRoutes from './components/projects/templates/Routes';
import ReportsRoutes from "./components/reports/Routes";
import KeyboardShortcuts from "./components/support/KeyboardShortcuts";
import SystemRoutes from "./components/system/Routes";
import TasksRoutes from "./components/tasks/Routes";
import UsersRoutes from "./components/users/Routes";
import VulnerabilitiesRoutes from "./components/vulnerabilities/Routes";
import Configuration from './Configuration';
import { AuthProvider } from './contexts/AuthContext';
import ThemeContext from './contexts/ThemeContext';
import setThemeColors from './utilities/setThemeColors';

const App = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
    useEffect(() => {
        localStorage.setItem('theme', theme)
        setThemeColors(theme)
    }, [theme])

    return (
        <BrowserRouter basename={Configuration.appBasename}>
            <AuthProvider>
                <ThemeContext.Provider value={{ theme, setTheme }}>
                    <Switch>
                        <ProtectedRoute exact path='/' component={Dashboard} />
                        {AuthRoutes.map((value, index) => React.cloneElement(value, { key: `auth_route_${index}` }))}
                        <Dashboard>
                            <Switch>
                                {
                                    [
                                        ...CommandsRoutes,
                                        ...ClientsRoutes,
                                        ...DocumentsRoutes,
                                        ...UsersRoutes,
                                        ...TasksRoutes,
                                        ...ProjectsRoutes,
                                        ...ProjectTemplatesRoutes,
                                        ...VulnerabilitiesRoutes,
                                        ...VulnerabilityTemplatesRoutes,
                                        ...TargetsRoutes,
                                        ...ReportsRoutes,
                                        ...SearchRoutes,
                                        ...SupportRoutes,
                                        ...SystemRoutes,
                                        ...OrganisationRoutes
                                    ]
                                        .map((value, index) => React.cloneElement(value, { key: `protected_route_${index}` }))
                                }
                                <ProtectedRoute path={`/integrations`} component={IntegrationsList} />
                                <ProtectedRoute path={`/auditlog`} component={AuditLogList} />
                                <Route component={PageNotFound} />
                            </Switch>
                            <KeyboardShortcuts />
                        </Dashboard>
                        <Route component={PageNotFound} />
                    </Switch>
                </ThemeContext.Provider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
