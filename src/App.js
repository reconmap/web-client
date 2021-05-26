import AuthRoutes from 'components/auth/Routes';
import CommandsRoutes from 'components/commands/Routes';
import DocumentsRoutes from 'components/documents/Routes';
import TargetsRoutes from 'components/target/Routes';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuditLogList from "./components/auditlog/List";
import ClientsRoutes from "./components/clients/Routes";
import IntegrationsList from "./components/integrations/List";
import Dashboard from "./components/layout/dashboard";
import PageNotFound from "./components/layout/dashboard/PageNotFound";
import ProtectedRoute from "./components/logic/ProtectedRoute";
import OrganisationRoutes from "./components/organisation/Routes";
import ProjectsRoutes from "./components/projects/Routes";
import ReportsRoutes from "./components/reports/Routes";
import SearchResults from './components/search/Results';
import SupportForm from "./components/support/Form";
import KeyboardShortcuts from "./components/support/KeyboardShortcuts";
import SystemRoutes from "./components/system/Routes";
import TasksRoutes from "./components/tasks/Routes";
import TemplatesRoutes from "./components/templates/Routes";
import Sandbox from './components/ui/Sandbox';
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
        <Router basename={Configuration.appBasename}>
            <AuthProvider>
                <ThemeContext.Provider value={{ theme, setTheme }}>
                    <Switch>
                        <ProtectedRoute exact path='/' component={Dashboard} />
                        {AuthRoutes.map((value, index) => React.cloneElement(value, { key: index }))}
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
                                        ...VulnerabilitiesRoutes,
                                        ...TargetsRoutes,
                                        ...TemplatesRoutes,
                                        ...ReportsRoutes,
                                        ...SystemRoutes,
                                        ...OrganisationRoutes
                                    ]
                                        .map((value, index) => React.cloneElement(value, { key: index }))
                                }
                                <ProtectedRoute path={`/search/:keywords`} component={SearchResults} />
                                <ProtectedRoute path={`/integrations`} component={IntegrationsList} />
                                <ProtectedRoute path={`/auditlog`} component={AuditLogList} />
                                <ProtectedRoute exact path={`/sandbox`} component={Sandbox} />
                                <ProtectedRoute exact path={`/support`} component={SupportForm} />
                                <Route component={PageNotFound} />
                            </Switch>
                            <KeyboardShortcuts />
                        </Dashboard>
                        <Route component={PageNotFound} />
                    </Switch>
                    <div id="toast"></div>
                </ThemeContext.Provider>
            </AuthProvider>
        </Router>
    );
};

export default App;
