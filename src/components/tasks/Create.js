import PageTitle from 'components/logic/PageTitle';
import { actionCompletedToast } from 'components/ui/toast';
import useQuery from 'hooks/useQuery';
import TaskModel from 'models/Task';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import { IconPlus } from "../ui/Icons";
import Title from '../ui/Title';
import TaskForm from "./Form";

const TaskCreationPage = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const defaultProjectId = "";
    const projectIdParam = useRef(query.get('projectId') || defaultProjectId);
    const forTemplate = parseInt(query.get('forTemplate')) === 1;

    const [newTask, setNewTask] = useState({ ...TaskModel, project_id: projectIdParam.current })

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/tasks`, { method: 'POST', body: JSON.stringify(newTask) })
        navigate(`/projects/${newTask.project_id}`)
        actionCompletedToast(`The task '${newTask.summary}' has been created.`);
    }

    return (
        <div>
            <PageTitle value="Add task" />
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/tasks">Tasks</Link>
                </Breadcrumb>
            </div>

            <Title title="New task details" icon={<IconPlus />} />

            <TaskForm onFormSubmit={onFormSubmit} task={newTask} forTemplate={forTemplate} taskSetter={setNewTask} />
        </div>
    )
}

export default TaskCreationPage;
