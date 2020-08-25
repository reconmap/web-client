import React from "react";
import Header from "../Header";
import Sidebar from "../sidebar";
import useSetTitle from "../../../hooks/useSetTitle";
import useFetch from "../../../hooks/useFetch";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

function Dashboard({ children }) {
  useSetTitle('Dashboard')
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
const  DashboardPanels  = () => {


  const [stats] = useFetch('/auditlog/stats')

    return <section>
      <div className=''>
        <h1>Dashboard</h1>
        <article className='base ' style={{ width:'440px' }} >
          <LineChart width={400} height={200} data={stats} >
            <Line type="monotone" dataKey="total" stroke="#8884d8"  strokeWidth={3}/>
            <CartesianGrid stroke="#000"  />
            <XAxis dataKey="log_date" />
            <YAxis dataKey="total" />
          </LineChart>
          <footer>
          auditlog/stats
          </footer>
        </article>
      </div>
    </section>
}

export default Dashboard;
