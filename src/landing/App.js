import React, { useState, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
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

const App = () => {
  const [logged, setLogged] = useState(false);
  const history = useHistory();

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
                <Route path={`${url}/tasks`} component={Tasks} exact />
                <Route path={`${url}/projects`} component={Projects} />
                <Route path={`${url}/project`} component={Project} />
                <Route path={`${url}/users`} component={Users} />
                <Route path={`${url}/integrations`} component={Integrations} />
                <Route path={`${url}/reports`} component={Reports} />
              </Dashboard>
            )}
          />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
