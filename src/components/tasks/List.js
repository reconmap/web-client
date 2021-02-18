import ReloadButton from 'components/ui/buttons/Reload';
import React, { useState } from 'react';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import TaskStatuses from "../../models/TaskStatuses";
import Breadcrumb from '../ui/Breadcrumb';
import ButtonGroup from "../ui/buttons/ButtonGroup";
import CreateButton from "../ui/buttons/Create";
import { IconClipboardList } from '../ui/Icons';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import TasksTable from './TasksTable';

const TasksList = ({ history }) => {
    useSetTitle('Tasks');

    const [tasks, reloadTasks] = useFetch('/tasks')
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
        history.push(`/tasks/create`);
    }

    const destroy = useDelete('/tasks/', reloadTasks);

    return <>
        <div className='heading'>
            <Breadcrumb />
            <ButtonGroup>
                <div>
                    <label>Project</label>
                    <select onChange={handleSetProject}>
                        <option value="">Any</option>
                        {projects && projects.map(project => <option value={project.id}
                            key={project.id}>{project.name}</option>)}
                    </select>
                </div>
                <div>
                    <label>Status</label>
                    <select onChange={handleSetStatus}>
                        <option value="">(any)</option>
                        {TaskStatuses.map((status, index) => <option value={status.id}>{status.name}</option>)}
                    </select>
                </div>
                <CreateButton onClick={handleCreateTask}>Create task</CreateButton>
                <ReloadButton onClick={async () => { setReloadButtonDisabled(true); await reloadTasks(); setReloadButtonDisabled(false); }} disabled={reloadButtonDisabled} />
            </ButtonGroup>
        </div>
        <Title title='Tasks' icon={<IconClipboardList />} />

        {!tasks ?
            <Loading /> :
            <TasksTable tasks={tasks} filter={filter} destroy={destroy} />
        }
    </>
}

export default TasksList
