import React from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/sidebar";

function Dashboard({children}) {
  
  return (
        <div className=" flex w-full h-screen p-5 mx-auto flex-col ">
          <Header />
          <div className="flex flex-row border-t border-gray-800">
            <Sidebar />
            <main role="main" className="p-5 w-full" >
              {children || <DashboardPanels />}
            </main>
          </div>
        </div>
  );
}
const DashboardPanels = () => {
  return <section>
          <div className=''>
            <h1>Dashboard</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              { Array.from({ length: 6 }).map( (i,j) =>
              <RandomPanel title={`Random panel ${j}`} desc='Minim sit nostrud sit cupidatat nisi id dolor magna et pariatur laboris. Labore est esse voluptate ut culpa nulla ullamco id do ex aute. '/>
                ) }
            </div>
          </div>
        </section>
}

const RandomPanel = ({desc, title}) => {
  return <article className='base base-reactive'>
    <p className='base-desc'>{desc}</p>
    <h4 className='base-subtitle'>{title}</h4>
  </article>
}
export default Dashboard;
