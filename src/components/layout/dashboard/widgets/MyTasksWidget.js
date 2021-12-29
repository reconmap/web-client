import { Th } from "@chakra-ui/react";
import TaskBadge from "components/tasks/TaskBadge";
import TaskStatusFormatter from "components/tasks/TaskStatusFormatter";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import Auth from "services/auth";

const MyTasksWidget = () => {
    const user = Auth.getLoggedInUser();
    const [tasks] = useFetch(`/tasks?assigneeUid=${user.id}&limit=5`)

    if (!tasks) return <Loading />

    return <article className="card">
        <h4>My tasks</h4>

        {tasks.length === 0 ?
            <p>You don't have any assigned tasks.</p>
            :
            <table>
                <thead>
                    <tr>
                        <Th>Summary</Th>
                        <Th>Status</Th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => <tr key={task.id}>
                        <td><TaskBadge task={task} /></td>
                        <td><TaskStatusFormatter task={task} /></td>
                    </tr>)}
                </tbody>
            </table>
        }
    </article>
}

export default MyTasksWidget;
