import secureApiFetch from '../../services/api';
import {useEffect, useState} from 'react';
import TasksTable from "../tasks/TasksTable";

const TasksSearchResults = ({keywords}) => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const reloadData = () => {
            secureApiFetch(`/tasks?keywords=${keywords}`, {method: 'GET'})
                .then(resp => {
                    return resp.json()
                })
                .then(json => {
                    setTasks(json);
                })
        }

        reloadData()
    }, [keywords])

    return <>
        <h3>{tasks.length} tasks matched</h3>
        <TasksTable tasks={tasks}/>
    </>
}

export default TasksSearchResults;
