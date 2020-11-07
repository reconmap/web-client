import Loading from '../ui/Loading';
import {IconClipboardList} from '../ui/Icons';
import TasksTable from "../tasks/TasksTable";
import CreateButton from "../ui/buttons/Create";

const ProjectTasks = ({tasks, handleAddTask}) => {
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
