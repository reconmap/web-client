import { HStack, Select } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import DeleteButton from 'components/ui/buttons/Delete';
import ReloadButton from 'components/ui/buttons/Reload';
import { actionCompletedToast } from 'components/ui/toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import secureApiFetch from 'services/api';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import TaskStatuses from "../../models/TaskStatuses";
import Breadcrumb from '../ui/Breadcrumb';
import CreateButton from "../ui/buttons/Create";
import { IconClipboardList } from '../ui/Icons';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import TasksTable from './TasksTable';

const TasksList = () => {
    const navigate = useNavigate();
    const [tasks, reloadTasks] = useFetch('/tasks');
    const [selectedTasks, setSelectedTasks] = useState([]);

    const [projects] = useFetch('/projects')
    const [filter, setFilter] = useState({ project: '', user: '', status: '' })

    const [reloadButtonDisabled, setReloadButtonDisabled] = useState(false);

    const handleSetProject = (ev) => {
        setFilter({ ...filter, project: ev.target.value })
    }
    const handleSetStatus = (ev) => {
        setFilter({ ...filter, status: ev.target.value })
    }
    const handleCreateTask = () => {
        navigate(`/tasks/create`);
    }

    const onStatusSelectChange = (ev) => {
        const newStatus = ev.target.value;

        secureApiFetch('/tasks', {
            method: 'PATCH',
            headers: {
                'Bulk-Operation': 'UPDATE',
            },
            body: JSON.stringify({
                taskIds: selectedTasks,
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
            body: JSON.stringify(selectedTasks),
        })
            .then(reloadTasks)
            .then(() => {
                setSelectedTasks([]);
                actionCompletedToast('All selected tasks were deleted.');
            })
            .catch(err => console.error(err));
    };

    const destroy = useDelete('/tasks/', reloadTasks);

    return <>
        <PageTitle value="Tasks" />
        <div className='heading'>
            <Breadcrumb />
            <HStack alignItems='flex-end'>
                <div>
                    <label>Project</label>
                    <Select onChange={handleSetProject}>
                        <option value="">(any)</option>
                        {projects && projects.map(project => <option value={project.id}
                            key={project.id}>{project.name}</option>)}
                    </Select>
                </div>
                <div>
                    <label>Status</label>
                    <Select onChange={handleSetStatus}>
                        <option value="">(any)</option>
                        {TaskStatuses.map(status => <option key={`taskstatus_${status.id}`} value={status.id}>{status.name}</option>)}
                    </Select>
                </div>
                <CreateButton onClick={handleCreateTask}>Create task</CreateButton>
                <label>Transition to&nbsp;
                    <Select disabled={!selectedTasks.length} onChange={onStatusSelectChange}>
                        <option value="">(select)</option>
                        {TaskStatuses.map((status, index) =>
                            <option key={index} value={status.id}>{status.name}</option>
                        )}
                    </Select>
                </label>
                <RestrictedComponent roles={['administrator']}>
                    <DeleteButton onClick={onDeleteButtonClick} disabled={!selectedTasks.length}>
                        Delete selected
                    </DeleteButton>
                </RestrictedComponent>
                <ReloadButton onClick={async () => { setReloadButtonDisabled(true); await reloadTasks(); setReloadButtonDisabled(false); }} disabled={reloadButtonDisabled} />
            </HStack>
        </div>
        <Title title='Tasks' icon={<IconClipboardList />} />

        {!tasks ?
            <Loading /> :
            <TasksTable tasks={tasks} selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} filter={filter} destroy={destroy} />
        }
    </>
}

export default TasksList
