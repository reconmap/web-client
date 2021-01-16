import React, {useState} from 'react'
import useSetTitle from '../../hooks/useSetTitle';
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import Title from '../ui/Title';
import TasksTable from './TasksTable';
import {IconClipboardList} from '../ui/Icons';
import ButtonGroup from "../ui/buttons/ButtonGroup";
import CreateButton from "../ui/buttons/Create";
import TaskStatuses from "../../models/TaskStatuses";

const TasksList = ({history}) => {
    useSetTitle('Tasks');
    const [tasks, updateTasks] = useFetch('/tasks')
    const [projects] = useFetch('/projects')
    const [filter, setFilter] = useState({project: '', user: '', status: ''})

    const handleSetProject = (ev) => {
        setFilter({...filter, project: ev.target.value})
    }
    const handleSetStatus = (ev) => {
        setFilter({...filter, status: ev.target.value})
    }
    const handleCreateTask = () => {
        history.push(`/tasks/create`);
    }

    const destroy = useDelete('/tasks/', updateTasks);

    return <>
        <div className='heading'>
            <Breadcrumb/>
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
            </ButtonGroup>
        </div>
        <Title title='Tasks' icon={<IconClipboardList/>}/>

        {!tasks ?
            <Loading/> :
            <TasksTable tasks={tasks} filter={filter} destroy={destroy}/>
        }
    </>
}

export default TasksList
