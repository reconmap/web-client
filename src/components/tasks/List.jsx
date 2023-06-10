import { Flex, HStack, Select } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import DeleteButton from 'components/ui/buttons/Delete';
import { actionCompletedToast } from 'components/ui/toast';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import secureApiFetch from 'services/api';
import useDelete from '../../hooks/useDelete';
import TaskStatuses from "../../models/TaskStatuses";
import Breadcrumb from '../ui/Breadcrumb';
import CreateButton from "../ui/buttons/Create";
import { IconClipboardList } from '../ui/Icons';
import Title from '../ui/Title';
import TaskFilters from './Filters';
import TasksTable from './TasksTable';
import TaskTableModel from './TaskTableModel';

const TasksList = () => {
    const navigate = useNavigate();

    const [tableModel, setTableModel] = useState(new TaskTableModel(true, true))

    const handleCreateTask = () => {
        navigate(`/tasks/create`);
    }

    const reloadTasks = useCallback(() => {
        setTableModel(tableModel => ({ ...tableModel, tasks: null }));

        const queryParams = new URLSearchParams();
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
    }, [setTableModel, tableModel.filters, tableModel.sortBy.column, tableModel.sortBy.order]);

    const onStatusSelectChange = (ev) => {
        const newStatus = ev.target.value;

        secureApiFetch('/tasks', {
            method: 'PATCH',
            headers: {
                'Bulk-Operation': 'UPDATE',
            },
            body: JSON.stringify({
                taskIds: tableModel.selection,
                newStatus: newStatus
            })
        })
            .then(reloadTasks)
            .then(() => {
                actionCompletedToast(`All selected tasks have been transitioned to "${newStatus}".`);
                ev.target.value = '';
            })
            .catch(err => console.error(err));
    }

    const onDeleteButtonClick = () => {
        secureApiFetch('/tasks', {
            method: 'PATCH',
            headers: {
                'Bulk-Operation': 'DELETE',
            },
            body: JSON.stringify(tableModel.selection),
        })
            .then(reloadTasks)
            .then(() => {
                setTableModel({ ...tableModel, selection: [] })
                actionCompletedToast('All selected tasks were deleted.');
            })
            .catch(err => console.error(err));
    };

    const destroy = useDelete('/tasks/', reloadTasks);

    useEffect(() => {
        reloadTasks()
    }, [reloadTasks, tableModel.filters])

    return <>
        <PageTitle value="Tasks" />
        <div className='heading'>
            <Breadcrumb />
            <HStack alignItems='flex-end'>
                <CreateButton onClick={handleCreateTask}>Create task</CreateButton>
                <label>Transition to&nbsp;
                    <Select disabled={!tableModel.selection.length} onChange={onStatusSelectChange}>
                        <option value="">(select)</option>
                        {TaskStatuses.map((status, index) =>
                            <option key={index} value={status.id}>{status.name}</option>
                        )}
                    </Select>
                </label>
                <RestrictedComponent roles={['administrator']}>
                    <DeleteButton onClick={onDeleteButtonClick} disabled={!tableModel.selection.length}>
                        Delete selected
                    </DeleteButton>
                </RestrictedComponent>
            </HStack>
        </div>
        <Title title='Tasks' icon={<IconClipboardList />} />

        <Flex>
            <TaskFilters tableModel={tableModel} tableModelSetter={setTableModel} />
        </Flex>

        <TasksTable tableModel={tableModel} tableModelSetter={setTableModel} destroy={destroy} reloadCallback={reloadTasks} />
    </>
}

export default TasksList
