import useQuery from 'hooks/useQuery';
import TaskModel from 'models/Task';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import { IconPlus } from "../ui/Icons";
import Title from '../ui/Title';
import TaskForm from "./Form";

const TaskCreationPage = ({ history }) => {
    const query = useQuery();
    const defaultProjectId = "";
    const projectIdParam = useRef(query.get('projectId') || defaultProjectId);

    const [newTask, setNewTask] = useState({ ...TaskModel, project_id: projectIdParam.current })

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/tasks`, { method: 'POST', body: JSON.stringify(newTask) })
        history.push(`/tasks?projectId=${newTask.project_id}`)
    }

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/tasks">Tasks</Link>
                </Breadcrumb>
            </div>

            <Title title="New task details" icon={<IconPlus />} />

            <TaskForm onFormSubmit={onFormSubmit} task={newTask} taskSetter={setNewTask} />
        </div>
    )
}

export default TaskCreationPage;
