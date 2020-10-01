import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Dashboard from "./components/layout/dashboard";
import Login from "./components/users/Login";
import AuditLogList from "./components/auditlog/List";
import ReportsList from "./components/reports/List";
import IntegrationsList from "./components/integrations/List";
import PageNotFound from "./components/layout/dashboard/PageNotFound";
import ProtectedRoute from "./components/logic/ProtectedRoute";
import {AuthProvider} from './contexts/AuthContext';
import SearchResults from './components/search/Results';
import ImportExportForm from './components/import-export/Form';
import ThemeContext from './contexts/ThemeContext';
import ClientsRoutes from "./components/clients/Routes";
import UsersRoutes from "./components/users/Routes";
import TasksRoutes from "./components/tasks/Routes";
import ProjectsRoutes from "./components/projects/Routes";
import VulnerabilitiesRoutes from "./components/vulnerabilities/Routes";
import TemplatesRoutes from "./components/templates/Routes";

const App = () => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

    useEffect(() => {
        localStorage.setItem('theme', theme)
        let rootDiv = document.getElementsByTagName('body')[0]
        rootDiv.className = ''
        rootDiv.classList.add(`${theme}-theme`)
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
                                {ClientsRoutes}
                                {UsersRoutes}
                                {TasksRoutes}
                                {ProjectsRoutes}
                                {VulnerabilitiesRoutes}
                                {TemplatesRoutes}
                                <ProtectedRoute path={`/search/:keywords`} component={SearchResults}/>
                                <ProtectedRoute path={`/integrations`} component={IntegrationsList}/>
                                <ProtectedRoute path={`/reports`} component={ReportsList}/>
                                <ProtectedRoute path={`/auditlog`} component={AuditLogList}/>
                                <ProtectedRoute exact path={`/import-export`} component={ImportExportForm}/>
                                <Route component={PageNotFound}/>
                            </Switch>
                        </Dashboard>
                        <Route component={PageNotFound}/>
                    </Switch>
                </ThemeContext.Provider>
            </AuthProvider>
        </Router>
    );
};

export default App;
