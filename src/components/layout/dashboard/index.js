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
  const data = [
    {name: 'Page A', uv: 400},
    {name: 'Page b', uv: 100},
    {name: 'Page A', uv: 500},
    {name: 'Page A', uv: 40},
  ];

  const [stats] = useFetch('/auditlog/stats')

    return <section>
      <div className=''>
        <h1>Dashboard</h1>
        <article className='base ' style={{ width:'440px'}} >
          <LineChart width={400} height={200} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8"  strokeWidth={3}/>
            <CartesianGrid stroke="#222" />
            <XAxis dataKey="name" />
          </LineChart>
        </article>
      </div>
    </section>
}

export default Dashboard;
