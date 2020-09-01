import React from 'react'
import TasksTable from '../tables/TasksTable';
import Loading from '../ui/Loading';

const ProjectTasks = ({ tasks, handleAddTask }) => {
    return <section className='mb-10'>
        <div className='heading'>

            <h2>Tasks(s) <small>({tasks && tasks.reduce(function (total, task) { return task.completed ? total + 1 : total; }, 0)}/{tasks && tasks.length} completed)</small></h2>
            <button onClick={handleAddTask} className='sm'>Add task</button>
        </div>
        {tasks ? <TasksTable tasks={tasks} /> : <Loading />}
    </section>
}

export default ProjectTasks