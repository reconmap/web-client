import useFetch from "hooks/useFetch";
import { Cell, Pie, PieChart } from "recharts";

const VulnerabilitiesByRiskStatsWidget = () => {
    const RADIAN = Math.PI / 180;

    const RISKS = {
        'none': { label: 'None', color: '#f3f3f3' },
        'low': { label: 'Low', color: 'var(--green)' },
        'medium': { label: 'Medium', color: 'var(--yellow)' },
        'high': { label: 'High', color: 'var(--purple)' },
        'critical': { label: 'Critical', color: 'var(--primary-color)' }
    };

    const renderCustomLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${RISKS[vulnerabilitiesByRiskStats[index].risk].label} (${vulnerabilitiesByRiskStats[index].total})`}
            </text>
        );
    };

    const [vulnerabilitiesByRiskStats] = useFetch('/vulnerabilities/stats?groupBy=risk')

    return <article className='card justify-center items-center'>
        <h4>Vulnerabilities by risk</h4>

        {vulnerabilitiesByRiskStats && vulnerabilitiesByRiskStats.length > 0 ? 
        <PieChart width={400} height={320} >
            <Pie
                data={vulnerabilitiesByRiskStats}
                dataKey="total"
                cx={160}
                cy={160}
                labelLine={false}
                outerRadius={100}
                strokeOpacity='0'
                strokeWidth='var(--borderWidth)'
                color='var(--bg-color)'
                fill="#8884d8"
                label={renderCustomLabel}
            >
                {
                    vulnerabilitiesByRiskStats && vulnerabilitiesByRiskStats.map((entry, index) =>
                        <Cell key={index} fill={RISKS[entry.risk].color} />
                    )
                }
            </Pie>
        </PieChart> : 
        <p>No enough data to generate the chart.</p>
}
    </article>
}

export default VulnerabilitiesByRiskStatsWidget
