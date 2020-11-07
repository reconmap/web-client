import React, {useEffect, useRef, useState} from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import BtnPrimary from '../ui/buttons/BtnPrimary';
import Title from '../ui/Title';
import CancelButton from "../ui/buttons/Cancel";
import useFetch from "../../hooks/useFetch";
import {useLocation} from 'react-router-dom';
import Loading from "../ui/Loading";

const CreateTask = ({history}) => {
    const location = useLocation();
    const defaultProjectId = "";
    const projectIdParam = useRef(new URLSearchParams(location.search).get('projectId') || defaultProjectId);

    const [projects] = useFetch('/projects');

    const [newTask, setNewTask] = useState({
        projectId: projectIdParam.current,
        name: null,
        description: null,
        parser: 'none',
    })

    const [loading, setLoading] = useState(false);

    const handleCreate = async (event) => {
        event.preventDefault();

        setLoading(true)
        await secureApiFetch(`/tasks`, {method: 'POST', body: JSON.stringify(newTask)})
        history.push(`/tasks?projectId=${newTask.projectId}`)
    }

    const handleFormChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setNewTask({...newTask, [name]: value});
    };

    const handleGoBack = () => {
        history.goBack()
    }

    useEffect(() => {
        if (projects !== null && projectIdParam.current === defaultProjectId) {
            const newProjectId = projects[0].id;
            setNewTask(n => ({...n, projectId: newProjectId}));
        }
    }, [projectIdParam, projects]);

    if (!projects) {
        return <Loading/>
    }

    return (
        <div>
            <div className='heading'>
                <Breadcrumb history={history}/>
            </div>
            <form onSubmit={handleCreate}>
                <Title title='Create Task'/>
                {projectIdParam.current === defaultProjectId &&
                <label>
                    Project
                    <select name="projectId" onChange={handleFormChange}
                            value={newTask.projectId}>
                        {projects && projects.map((project, index) =>
                            <option key={index} value={project.id}>{project.name}</option>
                        )}
                    </select>
                </label>
                }
                <label>Name
                    <input type="text" name="name" onChange={handleFormChange} required autoFocus value={newTask.name}/></label>
                <label>Description
                    <input type="description" name="description" onChange={handleFormChange} required
                           value={newTask.description}/></label>
                <label>Parser
                    <select name="parser" onChange={handleFormChange} required value={newTask.parser}>
                        <option value='none'>none</option>
                        <option value='sqlmap'>sqlmap</option>
                        <option value='nmap'>nmap</option>
                    </select>
                </label>
                <BtnPrimary type="submit"
                            disabled={loading}>{loading ? 'Creating...' : 'Create'}</BtnPrimary>
                <CancelButton onClick={handleGoBack} disabled={loading}/>
            </form>
        </div>
    )
}

export default CreateTask
