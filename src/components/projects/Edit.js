import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom';
import Breadcrumb from '../ui/Breadcrumb'
import Title from '../ui/Title'
import useFetch from "../../hooks/useFetch";
import secureApiFetch from "../../services/api";
import {IconPlus} from "../ui/Icons";
import PrimaryButton from "../ui/buttons/Primary";
import Loading from "../ui/Loading";
import {actionCompletedToast} from "../ui/toast";

const ProjectEdit = ({history}) => {
    const {projectId} = useParams();
    const [loading, setLoading] = useState(false)
    const [clients] = useFetch(`/clients`);
    const [savedProject] = useFetch(`/projects/${projectId}`);
    const [updatedProject, setProject] = useState(null);

    const onFormChange = ev => {
        setProject({...updatedProject, [ev.target.name]: ev.target.value});
    };
    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        setLoading(true)
        await secureApiFetch(`/projects/${projectId}`, {method: 'PUT', body: JSON.stringify(updatedProject)})
        actionCompletedToast(`Project "${updatedProject.name}" updated.`);
        history.push('/projects');
    };

    useEffect(() => {
        setProject(savedProject);
    }, [savedProject]);

    if (!savedProject || !updatedProject) {
        return <Loading/>
    }

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                    <Link to={`/projects/${savedProject.id}`}>{savedProject.name}</Link>
                </Breadcrumb>
            </div>
            <form onSubmit={onFormSubmit}>
                <Title title={`Edit Project ${savedProject.name}`} icon={<IconPlus/>}/>

                <label>Client
                    <select id="clientId" name="client_id" onChange={onFormChange}
                            value={updatedProject.client_id} defaultValue={updatedProject.clientId}>
                        {clients && clients.map((client, index) =>
                            <option key={index} value={client.id}>{client.name}</option>
                        )}
                    </select>
                </label>
                <label>Name
                    <input type="text" name="name" value={updatedProject.name} onChange={onFormChange} required
                           autoFocus/>
                </label>
                <label>Description
                    <input type="text" name="description" value={updatedProject.description} onChange={onFormChange}
                           required/>
                </label>
                <PrimaryButton type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update'}</PrimaryButton>
            </form>
        </div>
    )
}

export default ProjectEdit;
