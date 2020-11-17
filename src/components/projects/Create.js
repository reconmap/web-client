import React, {useState} from 'react'
import Breadcrumb from '../ui/Breadcrumb'
import BtnPrimary from '../ui/buttons/BtnPrimary'
import Title from '../ui/Title'
import CancelButton from "../ui/buttons/Cancel";
import useFetch from "../../hooks/useFetch";
import secureApiFetch from "../../services/api";
import {IconPlus} from '../ui/Icons';

const ProjectCreate = ({history}) => {
    const handleGoBack = () => {
        history.push('/projects');
    }
    const [loading, setLoading] = useState(false)
    const [clients] = useFetch('/clients')

    const [newProject, setNewProject] = useState({clientId: null, name: null, description: null})
    const handleFormChange = e => {
        setNewProject({...newProject, [e.target.name]: e.target.value});
    };
    const handleCreate = async (event) => {
        event.preventDefault();

        newProject.clientId = document.getElementById('clientId').value;

        setLoading(true)
        await secureApiFetch(`/projects`, {method: 'POST', body: JSON.stringify(newProject)})
        history.push('/projects');
    }

    return (
        <div>
            <Breadcrumb history={history}/>
            <form onSubmit={handleCreate}>
                <Title title='New Project' icon={<IconPlus/>}/>

                <label>Client
                    <select id="clientId" name="clientId" onChange={handleFormChange}
                            defaultValue={newProject.clientId}>
                        {clients && clients.map((client, index) =>
                            <option key={index} value={client.id}>{client.name}</option>
                        )}
                    </select>
                </label>
                <label>Name
                    <input type="text" name="name" onChange={handleFormChange} required autoFocus/>
                </label>
                <label>Description
                    <input type="text" name="description" onChange={handleFormChange} required/>
                </label>
                <BtnPrimary type="submit" disabled={loading}>{loading ? 'Wait please' : 'Create'}</BtnPrimary>
                <CancelButton onClick={handleGoBack} disabled={loading}/>
            </form>
        </div>
    )
}

export default ProjectCreate
