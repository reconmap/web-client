import {Cell, Pie, PieChart} from "recharts";
import React from "react";
import useFetch from "../../../hooks/useFetch";

const VulnerabilitiesByRiskStatsWidget = () => {
    const RADIAN = Math.PI / 180;

    const RISKS = {
        'none': {label: 'None', color: '#ffffff'},
        'low': {label: 'Low', color: '#21B803'},
        'medium': {label: 'Medium', color: '#FBBC04'},
        'high': {label: 'High', color: '#F66E0B'},
        'critical': {label: 'Critical', color: '#F41907'}
    };

    const renderCustomLabel = ({
                                   cx, cy, midAngle, innerRadius, outerRadius, percent, index,
                               }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${RISKS[vulnerabilitiesByRiskStats[index].risk].label} (${vulnerabilitiesByRiskStats[index].total})`}
            </text>
        );
    };

    const [vulnerabilitiesByRiskStats] = useFetch('/vulnerabilities/stats?groupBy=risk')

    return (
        <article className='card ' style={{width: '410px'}}>
            <PieChart width={380} height={400}>
                <Pie
                    data={vulnerabilitiesByRiskStats}
                    dataKey="total"
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    label={renderCustomLabel}
                >
                    {
                        vulnerabilitiesByRiskStats && vulnerabilitiesByRiskStats.map((entry, index) => <Cell
                            fill={RISKS[entry.risk].color}/>)
                    }
                </Pie>
            </PieChart>
            <footer>Vulnerabilities by risk</footer>
        </article>
    )
}

export default VulnerabilitiesByRiskStatsWidget