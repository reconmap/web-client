import React, { useState, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import Dashboard from "../components/layout/dashboard";
import Home from "./Home";
import Login from "./Login";
import AuthContext from "../contexts/AuthContext";
import ProjectsList from '../components/projects/List';
import UploadTaskResult from "../components/task/UploadTaskResult";
import UserPreferences from "../components/user/Preferences";
import UsersList from "../components/users/List";
import ProjectDetails from "../components/project/Details";
import AuditLogList from "../components/auditlog/List";
import TemplatesList from '../components/projects/TemplatesList';
import VulnerabilitiesList from "../components/vulnerabilities/List";
import UserCreationForm from "../components/users/CreationForm";
import TaskDetails from "../components/task/Details";
import ComponentsList from "../components/ui/ComponentsList";
import ProjectReport from "../components/project/Report";
import TasksList from "../components/tasks/List";
import ReportsList from "../components/reports/List";
import UserProfile from "../components/user/Profile";
import IntegrationsList from "../components/integrations/Integrations";

const App = () => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    setLogged(!!localStorage.getItem("reconmap-logged"));
  }, []);

  return (
    <AuthContext.Provider value={{ logged, setLogged }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route
            path="/dashboard"
            render={({ match: { url } }) => (
              <Dashboard>
                <Route exact path={`${url}/tasks`} component={TasksList} />
                <Route exact path={`${url}/tasks/:id`} component={TaskDetails} />
                <Route exact path={`${url}/tasks/:id/upload`} component={UploadTaskResult} />
                <Route path={`${url}/projects`} component={ProjectsList} />
                <Route path={`${url}/project/:id/report`} component={ProjectReport} />
                <Route exact path={`${url}/project/:id`} component={ProjectDetails} />
                <Route path={`${url}/users/create`} component={UserCreationForm} />
                <Route exact path={`${url}/users`} component={UsersList} />
                <Route path={`${url}/user/preferences`} component={UserPreferences} />
                <Route path={`${url}/user/me`} component={UserProfile} />
                <Route path={`${url}/integrations`} component={IntegrationsList} />
                <Route path={`${url}/reports`} component={ReportsList} />
                <Route path={`${url}/auditlog`} component={AuditLogList} />
                <Route path={`${url}/templates`} component={TemplatesList} />
                <Route path={`${url}/vulnerabilities`} component={VulnerabilitiesList} />
                <Route path={`${url}/components`} component={ComponentsList} />
              </Dashboard>
            )}
          />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
