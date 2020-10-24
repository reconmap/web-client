import TasksTable from '../tables/TasksTable';
import Loading from '../ui/Loading';
import { IconClipboardList, IconPlus } from '../icons';
import BtnSecondary from '../ui/buttons/BtnSecondary';

const ProjectTasks = ({ tasks, handleAddTask }) => {
    return <section>
            <h4>
                <IconClipboardList /> Task(s) <small>({tasks && tasks.reduce(function (total, task) { return task.completed ? total + 1 : total; }, 0)}/{tasks && tasks.length} completed)</small>
                <BtnSecondary onClick={handleAddTask} ><IconPlus />Add task</BtnSecondary>
            </h4>
        
        {tasks ? <TasksTable tasks={tasks} /> : <Loading />}
    </section>
}

export default ProjectTasks
