import React from 'react'
import TasksTable from '../tables/TasksTable';
import Loading from '../ui/Loading';
import { IconClipboardList, IconPlus } from '../icons';

const ProjectTasks = ({ tasks, handleAddTask }) => {
    return <section>
        <div className='heading'>
        <IconClipboardList />
            <h2>Task(s) <small>({tasks && tasks.reduce(function (total, task) { return task.completed ? total + 1 : total; }, 0)}/{tasks && tasks.length} completed)</small></h2>
            <button onClick={handleAddTask}>
                <IconPlus />
                Add task
            </button>
        </div>
        {tasks ? <TasksTable tasks={tasks} /> : <Loading />}
    </section>
}

export default ProjectTasks
