import RestrictedComponent from 'components/logic/RestrictedComponent';
import useDelete from 'hooks/useDelete';
import { useNavigate } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import TasksTable from "../tasks/TasksTable";
import CreateButton from "../ui/buttons/Create";
import { IconClipboardList } from '../ui/Icons';
import Loading from '../ui/Loading';

const ProjectTasks = ({ project }) => {
    const navigate = useNavigate();
    const isTemplate = project.is_template === 1;
    const [tasks, reloadTasks] = useFetch(`/projects/${project.id}/tasks`)

    const onAddTaskClick = ev => {
        ev.preventDefault();
        navigate(`/tasks/create?projectId=${project.id}&forTemplate=${project.is_template}`);
    }

    const onDeleteTask = useDelete('/tasks/', reloadTasks);

    return <section>
        <h4>
            <IconClipboardList /> Tasks {!isTemplate &&
                <>&nbsp;<small>({tasks && tasks.reduce((total, task) => {
                    return task.status === 'done' ? total + 1 : total;
                }, 0)}/{tasks && tasks.length} completed)</small></>}
            <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                <CreateButton onClick={onAddTaskClick}>Add task</CreateButton>
            </RestrictedComponent>
        </h4>

        {tasks ? <TasksTable tasks={tasks} showProjectColumn={false} destroy={onDeleteTask} /> : <Loading />}
    </section>
}

export default ProjectTasks;
