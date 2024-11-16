import TaskTableModel from 'components/tasks/TaskTableModel';
import { useEffect, useState } from 'react';
import secureApiFetch from '../../services/api';
import TasksTable from "../tasks/TasksTable";

const TasksSearchResults = ({ keywords, emptyResultsSetter: setEmptyResults }) => {

    const [tableModel, setTableModel] = useState(new TaskTableModel())

    useEffect(() => {
        const reloadData = () => {
            secureApiFetch(`/tasks?keywords=${keywords}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(tasks => {
                    setTableModel(tableModel => ({ ...tableModel, tasks: tasks }));
                    setEmptyResults(emptyResults => 0 === tasks.length ? emptyResults.concat('tasks') : emptyResults.filter(value => value !== 'tasks'));
                })
        }

        reloadData()
    }, [keywords, setEmptyResults])

    if (tableModel.tasks.length === 0) return <></>

    return <>
        <h3>{tableModel.tasks.length} matching tasks</h3>
        <TasksTable tableModel={tableModel} />
    </>
}

export default TasksSearchResults;
