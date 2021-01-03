import React, {useRef, useState} from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import Title from '../ui/Title';
import {Link, useLocation} from 'react-router-dom';
import {IconPlus} from "../ui/Icons";
import TaskForm from "./Form";

const TaskCreationPage = ({history}) => {
    const location = useLocation();
    const defaultProjectId = "";
    const projectIdParam = useRef(new URLSearchParams(location.search).get('projectId') || defaultProjectId);

    const [newTask, setNewTask] = useState({
        project_id: projectIdParam.current,
        name: null,
        description: null,
        parser: "",
    })

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/tasks`, {method: 'POST', body: JSON.stringify(newTask)})
        history.push(`/tasks?projectId=${newTask.project_id}`)
    }

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/tasks">Tasks</Link>
                </Breadcrumb>
            </div>

            <Title title="New task details" icon={<IconPlus/>}/>

            <TaskForm onFormSubmit={onFormSubmit} task={newTask} taskSetter={setNewTask}/>
        </div>
    )
}

export default TaskCreationPage;
