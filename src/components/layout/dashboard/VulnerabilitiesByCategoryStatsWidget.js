import {Pie, PieChart} from "recharts";
import React from "react";
import useFetch from "../../../hooks/useFetch";

const VulnerabilitiesByCategoryStatsWidget = () => {
    const [vulnerabilitiesByCategoryStats] = useFetch('/vulnerabilities/stats?groupBy=category')

    return (
        <article className='card ' style={{width: '410px'}}>
            <PieChart width={380} height={400}>
                <Pie
                    data={vulnerabilitiesByCategoryStats}
                    dataKey="total"
                    cx={200}
                    cy={200}
                    labelLine={true}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    fill="#82ca9d"
                    label={({index}) =>
                        `${vulnerabilitiesByCategoryStats[index].category_name} (${vulnerabilitiesByCategoryStats[index].total})`
                    }
                    labelStyle={{fill: '#ffffff'}}
                >
                </Pie>
            </PieChart>
            <footer>Vulnerabilities by category</footer>
        </article>
    )
}

export default VulnerabilitiesByCategoryStatsWidget