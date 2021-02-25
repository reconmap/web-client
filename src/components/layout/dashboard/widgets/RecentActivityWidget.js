import Badge from "components/badges/Badge";
import Loading from "components/ui/Loading";
import UserLink from "components/users/Link";
import useFetch from "hooks/useFetch";
import widgetIsVisible from "services/widgets";

const RecentActivityWidget = () => {
    const [auditLog] = useFetch('/auditlog?limit=5');

    const visible = widgetIsVisible('recent-activity');
    if (!visible) return null;

    if (!auditLog) return <Loading />

    return <article className="card">
        <h4>Recent activity</h4>

        <table>
            <thead>
                <th>Action</th>
                <th>User</th>
            </thead>
            <tbody>
                {auditLog.map(log => <tr>
                    <td><Badge>{log.action}</Badge></td>
                    <td>{log.user_name ?
                        <UserLink userId={log.user_id}>{log.user_name}</UserLink> : '-'}</td>
                </tr>)}
            </tbody>
        </table>
    </article>
}

export default RecentActivityWidget;
