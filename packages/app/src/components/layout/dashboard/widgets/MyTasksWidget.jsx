import { useQueryTasksForUser } from "api/tasks.js";
import TaskBadge from "components/tasks/TaskBadge";
import TaskStatusFormatter from "components/tasks/TaskStatusFormatter";
import Loading from "components/ui/Loading";
import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";
import DashboardWidget from "./Widget";

const MyTasksWidget = () => {
    const { user } = useContext(AuthContext);
    const { isPending, data: tasks } = useQueryTasksForUser(user.id);

    if (isPending) return <Loading />;

    return (
        <DashboardWidget title="My tasks">
            {tasks.length === 0 ? (
                <p>You don't have any assigned tasks.</p>
            ) : (
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Summary</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>
                                    <TaskBadge task={task} />
                                </td>
                                <td>
                                    <TaskStatusFormatter task={task} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </DashboardWidget>
    );
};

export default MyTasksWidget;
