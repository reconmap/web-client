
import Header from "../landing/Header";
import React from "react";
import Sidebar from "./components/Sidebar";
function Dashboard({children}) {
  
  return (
        <div className=" flex w-full h-screen p-5 mx-auto flex-col ">
          <Header />
          <div className="flex flex-row border-t border-gray-800">
            <Sidebar />
            <main role="main" className="p-5 w-full" >
              {children}
            </main>
          </div>
        </div>
  );
}

export default Dashboard;
