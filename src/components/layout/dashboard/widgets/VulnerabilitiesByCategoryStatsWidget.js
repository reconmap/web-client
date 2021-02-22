import useFetch from "hooks/useFetch";
import { Pie, PieChart } from "recharts";

const VulnerabilitiesByCategoryStatsWidget = () => {
    const [vulnerabilitiesByCategoryStats] = useFetch('/vulnerabilities/stats?groupBy=category')

    return (
        <article className='card justify-center items-center'>
            <h4>Vulnerabilities by category</h4>
            <PieChart width={320} height={320}>
                <Pie
                    data={vulnerabilitiesByCategoryStats}
                    dataKey="total"
                    cx={160}
                    cy={160}
                    labelLine={true}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    fill="#82ca9d"
                    label={({ index }) =>
                        `${vulnerabilitiesByCategoryStats[index].category_name} (${vulnerabilitiesByCategoryStats[index].total})`
                    }
                    labelStyle={{ fill: '#ffffff' }}
                >
                </Pie>
            </PieChart>
        </article>
    )
}

export default VulnerabilitiesByCategoryStatsWidget
