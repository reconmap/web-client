import React, {useEffect, useRef, useState} from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import PrimaryButton from '../ui/buttons/Primary';
import Title from '../ui/Title';
import useFetch from "../../hooks/useFetch";
import {Link, useLocation} from 'react-router-dom';
import {IconPlus} from "../ui/Icons";

const TaskCreationPage = ({history}) => {
    const location = useLocation();
    const defaultProjectId = "";
    const projectIdParam = useRef(new URLSearchParams(location.search).get('projectId') || defaultProjectId);

    const [projects] = useFetch('/projects');

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

    const onFormChange = ev => {
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

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/tasks">Tasks</Link>
                </Breadcrumb>
            </div>

            <Title title="New task details" icon={<IconPlus/>}/>

            <form onSubmit={onFormSubmit}>
                {projectIdParam.current === defaultProjectId &&
                <label>
                    Project
                    <select name="project_id" onChange={onFormChange}
                            value={newTask.project_id} required>
                        {projects && projects.map((project, index) =>
                            <option key={index} value={project.id}>{project.name}</option>
                        )}
                    </select>
                </label>
                }
                <label>Name
                    <input type="text" name="name" onChange={onFormChange} required autoFocus
                           value={newTask.name}/></label>
                <label>Description
                    <textarea name="description" onChange={onFormChange} required
                              value={newTask.description}/></label>
                <label>Command
                    <input type="text" name="command" onChange={onFormChange} value={newTask.command}/></label>
                <label>Command parser
                    <select name="command_parser" onChange={onFormChange} value={newTask.command_parser}>
                        <option value="">none</option>
                        <option value="sqlmap">sqlmap</option>
                        <option value="nmap">nmap</option>
                    </select>
                </label>
                <PrimaryButton type="submit">Create</PrimaryButton>
            </form>
        </div>
    )
}

export default TaskCreationPage;
