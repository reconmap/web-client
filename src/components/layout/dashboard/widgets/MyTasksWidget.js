import TaskBadge from "components/tasks/TaskBadge";
import TaskStatusFormatter from "components/tasks/TaskStatusFormatter";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import Auth from "services/auth";
import widgetIsVisible from "services/widgets";

const MyTasksWidget = () => {
    const user = Auth.getLoggedInUser();
    const [tasks] = useFetch(`/tasks?assigneeUid=${user.id}&limit=5`)

    const visible = widgetIsVisible('my-tasks');
    if (!visible) return null;

    if (!tasks) return <Loading />

    return <article className="card">
        <h4>My tasks</h4>

        <table>
            <thead>
                <th>Summary</th>
                <th>Status</th>
            </thead>
            <tbody>
                {tasks.map(task => <tr>
                    <td><TaskBadge task={task} /></td>
                    <td><TaskStatusFormatter task={task} /></td>
                </tr>)}
            </tbody>
        </table>
    </article>
}

export default MyTasksWidget;
