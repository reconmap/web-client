import ProjectEngagementTypes from "../../models/ProjectEngagementTypes";
import PrimaryButton from "../ui/buttons/Primary";
import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Loading from "../ui/Loading";

const ProjectForm = ({ isEdit = false, project, projectSetter: setProject, onFormSubmit }) => {

    const [clients] = useFetch('/clients');

    const handleFormChange = ev => {
        setProject({ ...project, [ev.target.name]: ev.target.value });
    };

    useEffect(() => {
        if (clients && clients.length && project.client_id === null) {
            setProject({ ...project, client_id: clients[0].id });
        }
    }, [project, clients, setProject]);

    if (!project && !clients) return <Loading />

    return <form onSubmit={onFormSubmit} className="crud">

        <fieldset>
            <legend>Basic information</legend>

            <label>Client
                <select name="client_id" onChange={handleFormChange} value={project.client_id}>
                    {clients && clients.map((client, index) =>
                        <option key={index} value={client.id}>{client.name}</option>
                    )}
                </select>
            </label>
            <label>Name
                <input type="text" name="name" onChange={handleFormChange} value={project.name} required autoFocus />
            </label>
            <label>Description
                <textarea name="description" onChange={handleFormChange} value={project.description} required />
            </label>
        </fieldset>

        <fieldset>
            <legend>Rules of engagement</legend>

            <label>
                Type
                <select name="engagement_type" value={project.engagement_type} onChange={handleFormChange}>
                    <option value="">(undefined)</option>
                    {ProjectEngagementTypes.map((type, index) => <option value={type.id}>{type.name}</option>)}
                </select>
            </label>

            <label>Start date
                <input type="date" name="engagement_start_date" value={project.engagement_start_date}
                    onChange={handleFormChange} />
            </label>

            <label>End date
                <input type="date" name="engagement_end_date" value={project.engagement_end_date}
                    onChange={handleFormChange} />
            </label>
        </fieldset>

        <PrimaryButton type="submit">{isEdit ? "Update" : "Create"}</PrimaryButton>
    </form>
}

export default ProjectForm;
