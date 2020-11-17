import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import Breadcrumb from '../ui/Breadcrumb'
import Title from '../ui/Title'
import useFetch from "../../hooks/useFetch";
import secureApiFetch from "../../services/api";
import {IconPlus} from "../ui/Icons";
import BtnPrimary from "../ui/buttons/BtnPrimary";
import CancelButton from "../ui/buttons/Cancel";
import Loading from "../ui/Loading";
import {actionCompletedToast} from "../../utilities/toast";

const ProjectEdit = ({history}) => {
    const {projectId} = useParams();
    const [loading, setLoading] = useState(false)
    const [clients] = useFetch(`/clients`);
    const [savedProject] = useFetch(`/projects/${projectId}`);
    const [updatedProject, setProject] = useState(null);

    const onCancelButtonClick = () => {
        history.push('/projects');
    };
    const onFormChange = e => {
        setProject({...updatedProject, [e.target.name]: e.target.value});
    };
    const onFormSubmit = async (event) => {
        event.preventDefault();

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
            <Breadcrumb history={history}/>
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
                <BtnPrimary type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update'}</BtnPrimary>
                <CancelButton onClick={onCancelButtonClick} disabled={loading}/>
            </form>
        </div>
    )
}

export default ProjectEdit;
