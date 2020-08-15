import {  Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ExternalApi from "./screens/ExternalApi";
import Header from "../landing/Header";
import React from "react";
import Tasks from './screens/Tasks'
import Sidebar from "./components/Sidebar";
function Dashboard() {
  
  return (
    <Router>
        <div className=" container flex w-full h-screen p-3 mx-auto flex-col ">
          <Header />
          <div className="  flex flex-row   ">
            <Sidebar />
            <main role="main" className="  p-5" >
              <Switch>
                <Route exact path="/dashboard" >reconMap Dashboard </Route>
                <Route exact path="/tasks" ><Tasks /></Route>
                <Route exact path="/external-api" ><ExternalApi /></Route>
              </Switch>
            </main>
          </div>
        </div>
    </Router>
  );
}

export default Dashboard;
