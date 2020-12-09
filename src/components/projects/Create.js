import React, {useState} from 'react'
import Breadcrumb from '../ui/Breadcrumb'
import BtnPrimary from '../ui/buttons/BtnPrimary'
import Title from '../ui/Title'
import useFetch from "../../hooks/useFetch";
import secureApiFetch from "../../services/api";
import {IconPlus} from '../ui/Icons';
import {Link} from "react-router-dom";

const ProjectCreate = ({history}) => {

    const [loading, setLoading] = useState(false)
    const [clients] = useFetch('/clients')

    const [newProject, setNewProject] = useState({clientId: null, name: null, description: null})
    const handleFormChange = ev => {
        setNewProject({...newProject, [ev.target.name]: ev.target.value});
    };
    const handleCreate = async (ev) => {
        ev.preventDefault();

        newProject.clientId = document.getElementById('clientId').value;

        setLoading(true)
        await secureApiFetch(`/projects`, {method: 'POST', body: JSON.stringify(newProject)})
        history.push('/projects');
    }

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                </Breadcrumb>
            </div>
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
                    <textarea name="description" onChange={handleFormChange} required/>
                </label>
                <BtnPrimary type="submit" disabled={loading}>Create</BtnPrimary>
            </form>
        </div>
    )
}

export default ProjectCreate
