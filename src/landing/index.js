import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Dashboard from "./../dashboard";
import Footer from "./Footer";
import Forbidden from "./Forbidden";
import Header from "./Header";
import Login from "./Login";
import Home from "./Home";

const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/dashboard" exact component={Dashboard} />
        <div className=" container flex w-full h-screen p-3 mx-auto flex-col ">
          <Header />
          <main role="main" className="flex flex-1 flex-col " >
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/oops" exact component={Forbidden} />
          </main>
          <Footer />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
