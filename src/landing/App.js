import React, { useState, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import Dashboard from "../dashboard";
import Home from "./Home";
import Login from "./Login";
import AuthContext from "../contexts/AuthContext";
import Tasks from "../dashboard/screens/Tasks";
import ProjectsList from '../components/projects/List';
import Integrations from "../dashboard/screens/Integrations";
import Reports from "../dashboard/screens/Reports";
import UploadTaskResult from "../components/task/UploadTaskResult";
import UserPreferences from "../components/user/Preferences";
import UsersList from "../components/users/List";
import ProjectDetails from "../components/project/Details";
import AuditLogList from "../components/auditlog/List";
import TemplatesList from '../components/projects/TemplatesList';
import VulnerabilitiesList from "../components/vulnerabilities/List";
import UserCreationForm from "../components/users/CreationForm";
import TaskDetails from "../components/task/Details";
import UIComponents from "../dashboard/screens/UIComponents";
import ProjectReport from "../components/project/Report";

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
                <Route exact path={`${url}/tasks`} component={Tasks} />
                <Route exact path={`${url}/tasks/:id`} component={TaskDetails} />
                <Route exact path={`${url}/tasks/:id/upload`} component={UploadTaskResult} />
                <Route path={`${url}/projects`} component={ProjectsList} />
                <Route path={`${url}/project/:id/report`} component={ProjectReport} />
                <Route exact path={`${url}/project/:id`} component={ProjectDetails} />
                <Route path={`${url}/users/create`} component={UserCreationForm} />
                <Route exact path={`${url}/users`} component={UsersList} />
                <Route path={`${url}/user/preferences`} component={UserPreferences} />
                <Route path={`${url}/integrations`} component={Integrations} />
                <Route path={`${url}/reports`} component={Reports} />
                <Route path={`${url}/auditlog`} component={AuditLogList} />
                <Route path={`${url}/templates`} component={TemplatesList} />
                <Route path={`${url}/vulnerabilities`} component={VulnerabilitiesList} />
                <Route path={`${url}/components`} component={UIComponents} />
              </Dashboard>
            )}
          />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
