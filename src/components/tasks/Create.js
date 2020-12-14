import React, {useEffect, useRef, useState} from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import PrimaryButton from '../ui/buttons/Primary';
import Title from '../ui/Title';
import useFetch from "../../hooks/useFetch";
import {Link, useLocation} from 'react-router-dom';
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

    const handleCreate = async (ev) => {
        ev.preventDefault();

        setLoading(true)
        await secureApiFetch(`/tasks`, {method: 'POST', body: JSON.stringify(newTask)})
        history.push(`/tasks?projectId=${newTask.projectId}`)
    }

    const handleFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setNewTask({...newTask, [name]: value});
    };

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
                <Breadcrumb>
                    <Link to="/tasks">Tasks</Link>
                </Breadcrumb>
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
                    <textarea name="description" onChange={handleFormChange} required
                              value={newTask.description}/></label>
                <label>Parser
                    <select name="parser" onChange={handleFormChange} required value={newTask.parser}>
                        <option value='none'>none</option>
                        <option value='sqlmap'>sqlmap</option>
                        <option value='nmap'>nmap</option>
                    </select>
                </label>
                <PrimaryButton type="submit"
                               disabled={loading}>{loading ? 'Creating...' : 'Create'}</PrimaryButton>
            </form>
        </div>
    )
}

export default CreateTask
