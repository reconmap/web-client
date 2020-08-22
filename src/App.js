import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import Dashboard from "./components/layout/dashboard";
import Login from "./components/user/Login";
import ProjectsList from './components/projects/List';
import UploadTaskResult from "./components/task/UploadTaskResult";
import UserPreferences from "./components/user/Preferences";
import UsersList from "./components/users/List";
import ProjectDetails from "./components/project/Details";
import AuditLogList from "./components/auditlog/List";
import TemplatesList from './components/projects/TemplatesList';
import VulnerabilitiesList from "./components/vulnerabilities/List";
import UserCreationForm from "./components/users/CreationForm";
import TaskDetails from "./components/task/Details";
import ComponentsList from "./components/ui/ComponentsList";
import ProjectReport from "./components/project/Report";
import TasksList from "./components/tasks/List";
import ReportsList from "./components/reports/List";
import UserProfile from "./components/user/Profile";
import IntegrationsList from "./components/integrations/Integrations";
import PageNotFound from "./components/layout/dashboard/PageNotFound";
import ProtectedRoute from "./components/logic/ProtectedRoute";
import { AuthProvider } from './contexts/AuthContext';
import VulnerabilityDetails from './components/vulnerabilities/Details';

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
              <ProtectedRoute path={`/projects`} component={ProjectsList} />
              <ProtectedRoute path={`/project/:id/report`} component={ProjectReport} />
              <ProtectedRoute exact path={`/project/:id`} component={ProjectDetails} />
              <ProtectedRoute path={`/users/create`} component={UserCreationForm} />
              <ProtectedRoute exact path={`/users`} component={UsersList} />
              <ProtectedRoute path={`/user/preferences`} component={UserPreferences} />
              <ProtectedRoute path={`/user/:id`} component={UserProfile} />
              <ProtectedRoute path={`/integrations`} component={IntegrationsList} />
              <ProtectedRoute path={`/reports`} component={ReportsList} />
              <ProtectedRoute path={`/auditlog`} component={AuditLogList} />
              <ProtectedRoute path={`/templates`} component={TemplatesList} />
              <ProtectedRoute exact path={`/vulnerabilities`} component={VulnerabilitiesList} />
              <ProtectedRoute path={`/vulnerabilities/:id`} component={VulnerabilityDetails} />
              <Route path={`/components`} component={ComponentsList} />
              <Redirect to={PageNotFound} />
            </Switch>
          </Dashboard>
          <Route component={PageNotFound} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
