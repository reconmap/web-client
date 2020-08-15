import {  Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Header from "../landing/Header";
import React from "react";
import Tasks from './screens/Tasks'
import Sidebar from "./components/Sidebar";
function Dashboard() {
  
  return (
        <div className=" container flex w-full h-screen p-3 mx-auto flex-col ">
          <Header />
          <div className="  flex flex-row   ">
            <Sidebar />
            <main role="main" className="  p-5" >
            Welcome.
            </main>
          </div>
        </div>
  );
}

export default Dashboard;
