import React, {useEffect, useState} from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import Title from '../ui/Title';
import {Link, useParams} from 'react-router-dom';
import {IconPlus} from "../ui/Icons";
import TaskForm from "./Form";
import useFetch from "../../hooks/useFetch";
import Loading from "../ui/Loading";

const EditTaskPage = ({history}) => {
    const {taskId} = useParams();

    const [serverTask] = useFetch(`/tasks/${taskId}`);
    const [clientTask, setClientTask] = useState(null);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/tasks/${taskId}`, {method: 'PATCH', body: JSON.stringify(clientTask)})
        history.push(`/tasks/${taskId}`)
    }

    useEffect(() => {
        if (serverTask)
            setClientTask(serverTask);
    }, [serverTask]);

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/tasks">Tasks</Link>
                </Breadcrumb>
            </div>

            <Title title="Task details" icon={<IconPlus/>}/>

            {!clientTask ? <Loading/> :
                <TaskForm isEditForm={true} onFormSubmit={onFormSubmit} task={clientTask} taskSetter={setClientTask}/>
            }
        </div>
    )
}

export default EditTaskPage;
