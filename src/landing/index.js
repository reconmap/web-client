import React, { useState, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";

import Dashboard from "./../dashboard";
import Home from "./Home";
import Login from "./Login";
import AuthContext from "../contexts/AuthContext";

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
          {logged ? 
            history.location.pathname ?
              <Route exact path={history.location.pathname}> <Dashboard /> </Route>
              : <Route exact path='/dashboard'> <Dashboard /> </Route>
           : (
            <>
              <Route exact path="/"> <Home /> </Route>
              <Route exact path="/login" component={() => <Login />} />
            </>
          )}
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
