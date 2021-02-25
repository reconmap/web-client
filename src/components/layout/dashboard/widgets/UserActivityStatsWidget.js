import useFetch from "hooks/useFetch";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import widgetIsVisible from "services/widgets";

const UserActivityStatsWidget = () => {
    const [auditLogStats] = useFetch('/auditlog/stats')

    const visible = widgetIsVisible('user-activity-stats');
    if (!visible) return null;

    return (
        <article className='card '>
            <h4>User activity over time</h4>
            <LineChart width={320} height={320} data={auditLogStats}>
                <Line type="monotone" dataKey="total" stroke="var(--primary-color)" strokeWidth="var(--borderWidth)" />
                <CartesianGrid stroke="var(--bg-color)" />
                <XAxis dataKey="log_date" />
                <YAxis dataKey="total" />
            </LineChart>
        </article>
    )
}

export default UserActivityStatsWidget
