import Loading from '../ui/Loading';
import {IconClipboardList} from '../ui/Icons';
import TasksTable from "../tasks/TasksTable";
import useFetch from "../../hooks/useFetch";
import {useHistory} from 'react-router-dom';
import CreateButton from "../ui/buttons/Create";

const ProjectTasks = ({project}) => {
    const history = useHistory();
    const [tasks] = useFetch(`/projects/${project.id}/tasks`)

    const handleAddTask = ev => {
        ev.preventDefault();
        history.push(`/tasks/create?projectId=${project.id}`);
    }

    return <section>
        <h4>
            <IconClipboardList/> Task(s) <small>({tasks && tasks.reduce(function (total, task) {
            return task.completed ? total + 1 : total;
        }, 0)}/{tasks && tasks.length} completed)</small>
            <CreateButton onClick={handleAddTask}>Add task</CreateButton>
        </h4>

        {tasks ? <TasksTable tasks={tasks}/> : <Loading/>}
    </section>
}

export default ProjectTasks
