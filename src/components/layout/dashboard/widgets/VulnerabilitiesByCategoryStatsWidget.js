import useFetch from "hooks/useFetch";
import PropTypes from 'prop-types';
import { Pie, PieChart } from "recharts";

const VulnerabilitiesByCategoryStatsWidget = ({ projectId = null }) => {
    const url = '/vulnerabilities/stats?groupBy=category' + (null !== projectId ? '&projectId=' + encodeURIComponent(projectId) : '');
    const [vulnerabilitiesByCategoryStats] = useFetch(url)

    return <article className='card justify-center items-center'>
        <h4>Vulnerabilities by category</h4>
        {vulnerabilitiesByCategoryStats && vulnerabilitiesByCategoryStats.length > 0 ?
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
            </PieChart> :
            <p>No enough data to generate the chart.</p>
        }
    </article>
}

VulnerabilitiesByCategoryStatsWidget.propTypes = {
    projectId: PropTypes.number
};

export default VulnerabilitiesByCategoryStatsWidget;
