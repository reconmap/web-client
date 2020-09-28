import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Dashboard from "./components/layout/dashboard";
import Login from "./components/users/Login";

import ProjectCreateForm from './components/projects/Create';
import ProjectsList from './components/projects/List';
import ProjectDetails from "./components/projects/Details";
import ProjectReport from "./components/projects/Report";

import UploadTaskResult from "./components/tasks/UploadTaskResult";
import UserPreferences from "./components/users/Preferences";
import UsersList from "./components/users/List";
import AuditLogList from "./components/auditlog/List";
import TemplatesList from './components/templates/List';
import TemplateDetails from './components/templates/Details';
import VulnerabilitiesList from "./components/vulnerabilities/List";
import UserCreationForm from "./components/users/CreationForm";
import TaskDetails from "./components/tasks/Details";
import TaskCreationForm from "./components/tasks/Create";
import TasksList from "./components/tasks/List";
import ReportsList from "./components/reports/List";
import UserProfile from "./components/users/Profile";
import IntegrationsList from "./components/integrations/List";
import PageNotFound from "./components/layout/dashboard/PageNotFound";
import ProtectedRoute from "./components/logic/ProtectedRoute";
import {AuthProvider} from './contexts/AuthContext';
import VulnerabilityDetails from './components/vulnerabilities/Details';
import TargetCreateForm from './components/target/Create';
import SearchResults from './components/search/Results';
import ProjectMembership from './components/projects/Membership';
import ImportExportForm from './components/import-export/Form';
import TargetView from './components/target/View';
import VulnerabilityCreate from './components/vulnerabilities/Create';
import ThemeContext from './contexts/ThemeContext';
import ClientsList from "./components/clients/List";
import ClientDetails from "./components/clients/Details";

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
                                <ProtectedRoute exact path={`/clients/:clientId([0-9]+)`} component={ClientDetails}/>
                                <ProtectedRoute exact path={`/clients`} component={ClientsList}/>
                                <ProtectedRoute exact path={`/tasks`} component={TasksList}/>
                                <ProtectedRoute exact path={`/tasks/:id([0-9]+)`} component={TaskDetails}/>
                                <ProtectedRoute exact path={`/tasks/:id([0-9]+)/upload`} component={UploadTaskResult}/>
                                <ProtectedRoute exact path={`/projects`} component={ProjectsList}/>
                                <ProtectedRoute exact path={`/projects/create`} component={ProjectCreateForm}/>
                                <ProtectedRoute path={`/projects/:id([0-9]+)/report`} component={ProjectReport}/>
                                <ProtectedRoute path={`/projects/:id([0-9]+)/membership`}
                                                component={ProjectMembership}/>
                                <ProtectedRoute path={`/projects/:id([0-9]+)/tasks/create`}
                                                component={TaskCreationForm}/>
                                <ProtectedRoute path={`/projects/:id([0-9]+)/targets/create`}
                                                component={TargetCreateForm}/>
                                <ProtectedRoute path={`/projects/:projectId([0-9]+)/targets/:targetId([0-9]+)`}
                                                component={TargetView}/>
                                <ProtectedRoute exact path={`/projects/:id([0-9]+)`} component={ProjectDetails}/>
                                <ProtectedRoute path={`/users/create`} component={UserCreationForm}/>
                                <ProtectedRoute exact path={`/users`} component={UsersList}/>
                                <ProtectedRoute path={`/users/preferences`} component={UserPreferences}/>
                                <ProtectedRoute path={`/users/:id([0-9]+)`} component={UserProfile}/>
                                <ProtectedRoute path={`/search/:keywords`} component={SearchResults}/>
                                <ProtectedRoute path={`/integrations`} component={IntegrationsList}/>
                                <ProtectedRoute path={`/reports`} component={ReportsList}/>
                                <ProtectedRoute path={`/auditlog`} component={AuditLogList}/>
                                <ProtectedRoute exact path={`/templates`} component={TemplatesList}/>
                                <ProtectedRoute exact path={`/import-export`} component={ImportExportForm}/>
                                <ProtectedRoute exact path={`/templates/:id([0-9]+)`} component={TemplateDetails}/>
                                <ProtectedRoute exact path={`/vulnerabilities`} component={VulnerabilitiesList}/>
                                <ProtectedRoute exact path={`/vulnerabilities/create`} component={VulnerabilityCreate}/>
                                <ProtectedRoute path={`/vulnerabilities/:id([0-9]+)`} component={VulnerabilityDetails}/>
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
