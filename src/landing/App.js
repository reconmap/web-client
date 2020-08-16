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
import Projects from "../dashboard/screens/Projects";
import Project from "../dashboard/screens/Project";
import Users from "../dashboard/screens/Users";
import Integrations from "../dashboard/screens/Integrations";
import Reports from "../dashboard/screens/Reports";
import Templates from "../dashboard/screens/Templates";
import UploadTask from "../dashboard/screens/UploadTask";

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
          
          {/* <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/project" component={Project} /> */}

          <Route
            path="/dashboard"
            render={({ match: { url } }) => (
              <Dashboard>
                <Route exact path={`${url}/tasks`} component={Tasks} />
                <Route exact path={`${url}/tasks/upload`} component={UploadTask} />
                <Route path={`${url}/projects`} component={Projects} />
                <Route path={`${url}/project/:id`} component={Project} />
                <Route path={`${url}/users`} component={Users} />
                <Route path={`${url}/integrations`} component={Integrations} />
                <Route path={`${url}/reports`} component={Reports} />
                <Route path={`${url}/templates`} component={Templates} />
              </Dashboard>
            )}
          />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
