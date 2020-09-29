import React, {useState} from 'react'
import Breadcrumb from '../ui/Breadcrumb'
import BtnPrimary from '../ui/buttons/BtnPrimary'
import Title from '../ui/Title'
import CancelButton from "../ui/buttons/Cancel";
import useFetch from "../../hooks/useFetch";
import secureApiFetch from "../../services/api";

const ProjectCreate = ({history}) => {
    const handleGoBack = () => {
        history.goBack()
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
        history.push(`/projects`)
    }
    const allFieldsFilled = newProject.name && newProject.description

    return (
        <div>
            <Breadcrumb history={history}/>
            <form>
                <Title title='New Project'/>
                <label>Client
                    <select id="clientId" name="clientId" onChange={handleFormChange}
                            defaultValue={newProject.clientId}>
                        {clients && clients.map((client, index) =>
                            <option key={index} value={client.id}>{client.name}</option>
                        )}
                    </select>
                </label>
                <label>Name
                    <input autoFocus type="text" name="name" onChange={handleFormChange}/>
                </label>
                <label>Description
                    <input type="description" name="description" onChange={handleFormChange}/>
                </label>
                <BtnPrimary type="submit" onClick={handleCreate}
                            disabled={loading || !allFieldsFilled}>{loading ? 'Wait please' : 'Create'}</BtnPrimary>
                <CancelButton onClick={handleGoBack} disabled={loading}/>
            </form>
        </div>
    )
}

export default ProjectCreate