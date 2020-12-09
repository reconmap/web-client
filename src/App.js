import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Dashboard from "./components/layout/dashboard";
import Login from "./components/users/Login";
import AuditLogList from "./components/auditlog/List";
import IntegrationsList from "./components/integrations/List";
import PageNotFound from "./components/layout/dashboard/PageNotFound";
import ProtectedRoute from "./components/logic/ProtectedRoute";
import {AuthProvider} from './contexts/AuthContext';
import SearchResults from './components/search/Results';
import ThemeContext from './contexts/ThemeContext';
import Sandbox from './components/ui/Sandbox';
import setThemeColors from './utilities/setThemeColors';
import ClientsRoutes from "./components/clients/Routes";
import UsersRoutes from "./components/users/Routes";
import TasksRoutes from "./components/tasks/Routes";
import ProjectsRoutes from "./components/projects/Routes";
import ReportsRoutes from "./components/reports/Routes";
import TemplatesRoutes from "./components/templates/Routes";
import VulnerabilitiesRoutes from "./components/vulnerabilities/Routes";
import SupportForm from "./components/support/Form";
import SystemRoutes from "./components/system/Routes";
import KeyboardShortcuts from "./components/support/KeyboardShortcuts";
import OrganisationRoutes from "./components/organisation/Routes";

const App = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
    useEffect(() => {
        localStorage.setItem('theme', theme)
        setThemeColors(theme)
    }, [theme])

    return (
        <Router>
            <AuthProvider>
                <ThemeContext.Provider value={{theme, setTheme}}>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <ProtectedRoute exact path='/' component={Dashboard}/>
                        <Dashboard>
                            <Switch>
                                {
                                    [
                                        ...ClientsRoutes,
                                        ...UsersRoutes,
                                        ...TasksRoutes,
                                        ...ProjectsRoutes,
                                        ...VulnerabilitiesRoutes,
                                        ...TemplatesRoutes,
                                        ...ReportsRoutes,
                                        ...SystemRoutes,
                                        ...OrganisationRoutes
                                    ]
                                        .map((value, index) => React.cloneElement(value, {key: index}))
                                }
                                <ProtectedRoute path={`/search/:keywords`} component={SearchResults}/>
                                <ProtectedRoute path={`/integrations`} component={IntegrationsList}/>
                                <ProtectedRoute path={`/auditlog`} component={AuditLogList}/>
                                <ProtectedRoute exact path={`/sandbox`} component={Sandbox}/>
                                <ProtectedRoute exact path={`/support`} component={SupportForm}/>
                                <Route component={PageNotFound}/>
                            </Switch>
                            <KeyboardShortcuts/>
                        </Dashboard>
                        <Route component={PageNotFound}/>
                    </Switch>
                    <div id="toast"></div>
                </ThemeContext.Provider>
            </AuthProvider>
        </Router>
    );
};

export default App;
