
import Header from "../landing/Header";
import React from "react";
import Sidebar from "./components/Sidebar";
function Dashboard({children}) {
  
  return (
        <div className=" container flex w-full h-screen p-3 mx-auto flex-col ">
          <Header />
          <div className="  flex flex-row   ">
            <Sidebar />
            <main role="main" className="  p-5" >
              {children}
            </main>
          </div>
        </div>
  );
}

export default Dashboard;
