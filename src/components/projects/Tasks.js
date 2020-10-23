import TasksTable from '../tables/TasksTable';
import Loading from '../ui/Loading';
import { IconClipboardList, IconPlus } from '../icons';
import BtnSecondary from '../ui/buttons/BtnSecondary';

const ProjectTasks = ({ tasks, handleAddTask }) => {
    return <section>
        <div className='heading'>
        <IconClipboardList />
            <h2>Task(s) <small>({tasks && tasks.reduce(function (total, task) { return task.completed ? total + 1 : total; }, 0)}/{tasks && tasks.length} completed)</small></h2>
            <BtnSecondary  onClick={handleAddTask}>
                <IconPlus size={4}/>
                Add task
            </BtnSecondary>
        </div>
        {tasks ? <TasksTable tasks={tasks} /> : <Loading />}
    </section>
}

export default ProjectTasks
