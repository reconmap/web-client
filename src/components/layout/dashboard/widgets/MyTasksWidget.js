import TaskBadge from "components/badges/TaskBadge";
import TaskStatusFormatter from "components/tasks/TaskStatusFormatter";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";

const MyTasksWidget = () => {
    const [tasks] = useFetch(`/tasks?limit=5`)

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
