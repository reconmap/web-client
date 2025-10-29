import { useAuditLogStatsQuery } from "api/auditlog.js";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import DashboardWidget from "./Widget";

const UserActivityStatsWidget = () => {
    const { data: auditLogStats } = useAuditLogStatsQuery();

    return (
        <DashboardWidget title="User activity over time">
            {auditLogStats && auditLogStats.length > 0 ? (
                <LineChart width={320} height={320} data={auditLogStats}>
                    <Line type="monotone" dataKey="total" stroke="var(--color-accent-1)" />
                    <CartesianGrid />
                    <XAxis dataKey="log_date" />
                    <YAxis dataKey="total" />
                </LineChart>
            ) : (
                <p>No enough data to generate the chart.</p>
            )}
        </DashboardWidget>
    );
};

export default UserActivityStatsWidget;
