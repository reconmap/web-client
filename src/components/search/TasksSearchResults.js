import { useEffect, useState } from 'react';
import secureApiFetch from '../../services/api';
import TasksTable from "../tasks/TasksTable";

const TasksSearchResults = ({ keywords }) => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const reloadData = () => {
            secureApiFetch(`/tasks?keywords=${keywords}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(json => {
                    setTasks(json);
                })
        }

        reloadData()
    }, [keywords])

    return <>
        <h3>{tasks.length} matching tasks</h3>
        <TasksTable tasks={tasks} />
    </>
}

export default TasksSearchResults;
