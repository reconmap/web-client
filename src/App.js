import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import Dashboard from "./components/layout/dashboard";
import Login from "./components/user/Login";

import ProjectCreateForm from './components/projects/Create';
import ProjectsList from './components/projects/List';
import ProjectDetails from "./components/project/Details";
import ProjectReport from "./components/project/Report";

import UploadTaskResult from "./components/task/UploadTaskResult";
import UserPreferences from "./components/user/Preferences";
import UsersList from "./components/users/List";
import AuditLogList from "./components/auditlog/List";
import TemplatesList from './components/templates/List';
import TemplateDetails from './components/templates/Details';
import VulnerabilitiesList from "./components/vulnerabilities/List";
import UserCreationForm from "./components/users/CreationForm";
import TaskDetails from "./components/task/Details";
import TaskCreationForm from "./components/task/Create";
import TasksList from "./components/tasks/List";
import ReportsList from "./components/reports/List";
import UserProfile from "./components/user/Profile";
import IntegrationsList from "./components/integrations/List";
import PageNotFound from "./components/layout/dashboard/PageNotFound";
import ProtectedRoute from "./components/logic/ProtectedRoute";
import { AuthProvider } from './contexts/AuthContext';
import VulnerabilityDetails from './components/vulnerabilities/Details';
import TargetCreateForm from './components/target/Create';
import SearchResults from './components/search/Results';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path='/' component={Dashboard} />
          <Dashboard>
            <Switch>
              <ProtectedRoute exact path={`/tasks`} component={TasksList} />
              <ProtectedRoute exact path={`/tasks/:id`} component={TaskDetails} />
              <ProtectedRoute exact path={`/tasks/:id/upload`} component={UploadTaskResult} />
              <ProtectedRoute exact path={`/projects`} component={ProjectsList} />
              <ProtectedRoute exact path={`/projects/create`} component={ProjectCreateForm} />
              <ProtectedRoute path={`/project/:id/report`} component={ProjectReport} />
              <ProtectedRoute path={`/project/:id/tasks/create`} component={TaskCreationForm} />
              <ProtectedRoute path={`/project/:id/targets/create`} component={TargetCreateForm} />
              <ProtectedRoute exact path={`/project/:id`} component={ProjectDetails} />
              <ProtectedRoute path={`/users/create`} component={UserCreationForm} />
              <ProtectedRoute exact path={`/users`} component={UsersList} />
              <ProtectedRoute path={`/user/preferences`} component={UserPreferences} />
              <ProtectedRoute path={`/user/:id`} component={UserProfile} />
              <ProtectedRoute path={`/search/:keywords`} component={SearchResults} />
              <ProtectedRoute path={`/integrations`} component={IntegrationsList} />
              <ProtectedRoute path={`/reports`} component={ReportsList} />
              <ProtectedRoute path={`/auditlog`} component={AuditLogList} />
              <ProtectedRoute exact path={`/templates`} component={TemplatesList} />
              <ProtectedRoute exact path={`/templates/:id`} component={TemplateDetails} />
              <ProtectedRoute exact path={`/vulnerabilities`} component={VulnerabilitiesList} />
              <ProtectedRoute path={`/vulnerabilities/:id`} component={VulnerabilityDetails} />
              <Redirect to={'/'}><PageNotFound /></Redirect>
            </Switch>
          </Dashboard>
          <Route component={PageNotFound} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
