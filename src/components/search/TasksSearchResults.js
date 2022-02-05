import { useEffect, useState } from 'react';
import secureApiFetch from '../../services/api';
import TasksTable from "../tasks/TasksTable";

const TasksSearchResults = ({ keywords, emptyResultsSetter: setEmptyResults }) => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const reloadData = () => {
            secureApiFetch(`/tasks?keywords=${keywords}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(tasks => {
                    setTasks(tasks);
                    setEmptyResults(emptyResults => (tasks.length === 0 ? emptyResults.concat('tasks') : emptyResults.filter(entity => entity !== 'tasks')));
                })
        }

        reloadData()
    }, [keywords, setEmptyResults])

    if (tasks.length === 0) return <></>

    return <>
        <h3>{tasks.length} matching tasks</h3>
        <TasksTable tasks={tasks} />
    </>
}

export default TasksSearchResults;
