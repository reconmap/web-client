import React from "react";
import Header from "../Header";
import Sidebar from "../sidebar";
import useSetTitle from "../../../hooks/useSetTitle";
import useFetch from "../../../hooks/useFetch";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts';

function Dashboard({ children }) {
  useSetTitle('Dashboard')
  return (
    <div className=" flex w-full h-screen p-5 mx-auto flex-col">
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

  const [auditLogStats] = useFetch('/auditlog/stats')
  const [vulnerabilityStats] = useFetch('/vulnerabilities/stats')
  const colors = {
    'none': '#ffffff',
    'low': '#21B803',
    'medium': '#FBBC04',
    'high': '#F66E0B',
    'critical': '#F41907'
  };
  const RADIAN = Math.PI / 180;

  const renderCustomLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    console.log();
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${vulnerabilityStats[index].risk} ${vulnerabilityStats[index].total}`}
      </text>
    );
  };

  return <section >
      <h1>Dashboard</h1>
      <div className='flex flex-wrap gap-4'>
        <article className='card ' style={{ width: '410px' }} >
          <LineChart width={380} height={200} data={auditLogStats} >
            <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={3} />
            <CartesianGrid stroke="#000" />
            <XAxis dataKey="log_date" />
            <YAxis dataKey="total" />
          </LineChart>
          <footer>User activity over time</footer>
        </article>
        <article className='card ' style={{ width: '410px' }} >
          <PieChart width={380} height={400}>
            <Pie
              data={vulnerabilityStats}
              dataKey="total"
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              label={renderCustomLabel}
            >
              {
                vulnerabilityStats && vulnerabilityStats.map((entry, index) => <Cell fill={colors[entry.risk]} />)
              }
            </Pie>
          </PieChart>
          <footer>Vulnerabilities by risk</footer>
        </article>
      </div>

  </section>
}

export default Dashboard;
