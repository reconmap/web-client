import RestrictedComponent from 'components/logic/RestrictedComponent';
import TaskTableModel from 'components/tasks/TaskTableModel';
import useDelete from 'hooks/useDelete';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import secureApiFetch from 'services/api';
import TasksTable from "../tasks/TasksTable";
import CreateButton from "../ui/buttons/Create";
import { IconClipboardList } from '../ui/Icons';

const ProjectTasks = ({ project }) => {
    const navigate = useNavigate();
    const isTemplate = project.is_template === 1;

    const [tableModel, setTableModel] = useState(new TaskTableModel(false, false))

    const reloadTasks = useCallback(() => {
        setTableModel(tableModel => ({ ...tableModel, tasks: null }));

        const queryParams = new URLSearchParams();
        queryParams.set('projectId', project.id);
        queryParams.set('orderColumn', tableModel.sortBy.column);
        queryParams.set('orderDirection', tableModel.sortBy.order);
        Object.keys(tableModel.filters)
            .forEach(key => tableModel.filters[key] !== null && tableModel.filters[key].length !== 0 && queryParams.append(key, tableModel.filters[key]));
        const url = `/tasks?${queryParams.toString()}`;

        secureApiFetch(url, { method: 'GET' })
            .then(resp => {
                return resp.json()
            })
            .then(data => {
                setTableModel(tableModel => ({ ...tableModel, tasks: data }));
            });
    }, [setTableModel, project.id, tableModel.filters, tableModel.sortBy.column, tableModel.sortBy.order]);


    const onAddTaskClick = ev => {
        ev.preventDefault();
        navigate(`/tasks/create?projectId=${project.id}&forTemplate=${project.is_template}`);
    }

    const onDeleteTask = useDelete('/tasks/', reloadTasks);

    useEffect(() => {
        reloadTasks()
    }, [reloadTasks, tableModel.filters])

    return <section>
        <h4>
            <IconClipboardList /> Tasks {!isTemplate &&
                <>&nbsp;<small>({tableModel.tasks && tableModel.tasks.reduce((total, task) => {
                    return task.status === 'done' ? total + 1 : total;
                }, 0)}/{tableModel.tasks && tableModel.tasks.length} completed)</small></>}
            <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                <CreateButton onClick={onAddTaskClick}>Add task</CreateButton>
            </RestrictedComponent>
        </h4>

        <TasksTable tableModel={tableModel} showProjectColumn={false} destroy={onDeleteTask} reloadCallback={reloadTasks} />
    </section>
}

export default ProjectTasks;
