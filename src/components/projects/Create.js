import { actionCompletedToast } from 'components/ui/toast';
import useQuery from 'hooks/useQuery';
import Project from 'models/Project';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import secureApiFetch from "../../services/api";
import Breadcrumb from '../ui/Breadcrumb';
import { IconPlus } from '../ui/Icons';
import Title from '../ui/Title';
import ProjectForm from "./Form";

const ProjectCreate = ({ history }) => {

    const query = useQuery();
    const isTemplate = 'true' === query.get('isTemplate');
    const [newProject, setNewProject] = useState({ ...Project, is_template: isTemplate });

    const handleCreate = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/projects`, { method: 'POST', body: JSON.stringify(newProject) })

        if (newProject.is_template) {
            history.push('/projects/templates');
        } else {
            history.push('/projects');
        }

        actionCompletedToast(`The project '${newProject.name}' has been created`);
    }

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                </Breadcrumb>
            </div>
            <Title title="New project details" icon={<IconPlus />} />

            <ProjectForm project={newProject} projectSetter={setNewProject} onFormSubmit={handleCreate} />
        </div>
    )
}

export default ProjectCreate
