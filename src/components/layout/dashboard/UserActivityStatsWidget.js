import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";
import useFetch from "../../../hooks/useFetch";

const UserActivityStatsWidget = () => {
    const [auditLogStats] = useFetch('/auditlog/stats')

    return (
        <article className='card '>
            <LineChart width={320} height={400} data={auditLogStats}>
                <Line type="monotone" dataKey="total" stroke="var(--primary-color)" strokeWidth="var(--borderWidth)"/>
                <CartesianGrid stroke="var(--bg-color)"/>
                <XAxis dataKey="log_date"/>
                <YAxis dataKey="total"/>
            </LineChart>
            <footer>User activity over time</footer>
        </article>
    )
}

export default UserActivityStatsWidget