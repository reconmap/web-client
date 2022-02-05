import { Checkbox, Select } from "@chakra-ui/react";
import MarkdownEditor from "components/ui/forms/MarkdownEditor";
import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import ProjectEngagementTypes from "../../models/ProjectEngagementTypes";
import ProjectVulnerabilityMetrics from "models/ProjectVulnerabilityMetrics";
import PrimaryButton from "../ui/buttons/Primary";
import Loading from "../ui/Loading";

const ProjectForm = ({ isEdit = false, project, projectSetter: setProject, onFormSubmit }) => {

    const [clients] = useFetch('/clients');

    const handleFormChange = ev => {
        const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
        setProject({ ...project, [ev.target.name]: value });
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

            <label>Is template?
                <Checkbox name="is_template" onChange={handleFormChange} isChecked={project.is_template} />
            </label>

            {!project.is_template && <>
                <label>Visibility
                    <Select name="visibility" onChange={handleFormChange} value={project.visibility}>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </Select>
                </label>

                <label>Client
                    <Select name="client_id" onChange={handleFormChange} value={project.client_id || ""}>
                        {clients && clients.map((client, index) =>
                            <option key={index} value={client.id}>{client.name}</option>
                        )}
                    </Select>
                </label>

                <label>External ID
                    <input type="text" name="external_id" onChange={handleFormChange} value={project.external_id || ""} />
                </label>
            </>}

            <label>Name
                <input type="text" name="name" onChange={handleFormChange} value={project.name || ""} required autoFocus />
            </label>
            <label>Description
                <MarkdownEditor name="description" onChange={handleFormChange} value={project.description || ""} required />
            </label>
        </fieldset>

        <fieldset>
            <legend>Rules of engagement</legend>

            <label>
                Type
                <Select name="engagement_type" value={project.engagement_type || ""} onChange={handleFormChange}>
                    <option value="">(undefined)</option>
                    {ProjectEngagementTypes.map(type => <option key={`engtype_${type.id}`} value={type.id}>{type.name}</option>)}
                </Select>
            </label>

            <legend>Vulnerability Metrics</legend>
            <label>
                Type
                <Select name="vulnerability_metrics" value={project.vulnerability_metrics || ""} onChange={handleFormChange}>
                    <option value="">(undefined)</option>
                    {ProjectVulnerabilityMetrics.map(type => <option key={`metrics_${type.id}`} value={type.id}>{type.name}</option>)}
                </Select>
            </label>

            {!project.is_template && <>
                <label>Start date
                    <input type="date" name="engagement_start_date" value={project.engagement_start_date}
                        onChange={handleFormChange} />
                </label>

                <label>End date
                    <input type="date" name="engagement_end_date" value={project.engagement_end_date}
                        onChange={handleFormChange} />
                </label>
            </>}
        </fieldset>

        <PrimaryButton type="submit">{isEdit ? "Update" : "Create"}</PrimaryButton>
    </form>
}

export default ProjectForm;
