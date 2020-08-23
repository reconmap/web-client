import React, { Component } from "react";
import Header from "../Header";
import Sidebar from "../sidebar";
import Plot from 'react-plotly.js';
import secureApiFetch from '../../../services/api';
import useSetTitle from "../../../hooks/useSetTitle";

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
class DashboardPanels extends Component {

  state = {
    plotData: {
      x: [],
      y: [],
      type: 'bar'
    }
  }

  componentDidMount() {
    secureApiFetch('/auditlog/stats', { method: 'GET' })
      .then((response) => response.json())
      .then((json) => {
        var newState = {
          x: json.map(a => a.log_date),
          y: json.map(a => a.total),
          type: 'bar'
        };
        this.setState({ plotData: newState });
      });
  }

  render() {
    return <section>
      <div className=''>
        <h1>Dashboard</h1>
        <Plot
          data={[this.state.plotData]}
          layout={{ title: 'User activity on the platform over time',yaxis:{gridcolor:'gray'}, xaxis: { autotick: false , color:'white'} , paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)' ,legend:{font:{color:'white'}}, titlefont:{color:'white'}}}
          config={{ autoSize: true }}
        />
      </div>
    </section>
  }
}

export default Dashboard;
