import RestrictedComponent from 'components/logic/RestrictedComponent';
import { useHistory } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import TasksTable from "../tasks/TasksTable";
import CreateButton from "../ui/buttons/Create";
import { IconClipboardList } from '../ui/Icons';
import Loading from '../ui/Loading';

const ProjectTasks = ({ project }) => {
    const history = useHistory();
    const [tasks] = useFetch(`/projects/${project.id}/tasks`)

    const handleAddTask = ev => {
        ev.preventDefault();
        history.push(`/tasks/create?projectId=${project.id}`);
    }

    return <section>
        <h4>
            <IconClipboardList /> Tasks&nbsp;<small>({tasks && tasks.reduce(function (total, task) {
                return task.status === 'done' ? total + 1 : total;
            }, 0)}/{tasks && tasks.length} completed)</small>
            <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                <CreateButton onClick={handleAddTask}>Add task</CreateButton>
            </RestrictedComponent>
        </h4>

        {tasks ? <TasksTable tasks={tasks} /> : <Loading />}
    </section>
}

export default ProjectTasks
