import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import secureApiFetch from "../../services/api";
import Breadcrumb from '../ui/Breadcrumb';
import { IconPlus } from "../ui/Icons";
import Loading from "../ui/Loading";
import Title from '../ui/Title';
import { actionCompletedToast } from "../ui/toast";
import ProjectForm from "./Form";

const ProjectEdit = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [serverProject] = useFetch(`/projects/${projectId}`);
    const [clientProject, setClientProject] = useState(null);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/projects/${projectId}`, { method: 'PUT', body: JSON.stringify(clientProject) })
        actionCompletedToast(`The project "${clientProject.name}" has been updated.`);

        if (clientProject.is_template) {
            navigate(`/projects/templates/${projectId}`);
        } else {
            navigate(`/projects/${projectId}`);
        }
    };

    useEffect(() => {
        setClientProject(serverProject);
    }, [serverProject]);

    if (!serverProject || !clientProject) {
        return <Loading />
    }

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                    <Link to={`/projects/${serverProject.id}`}>{serverProject.name}</Link>
                </Breadcrumb>
            </div>
            <Title title="Project details" icon={<IconPlus />} />

            <ProjectForm isEdit={true} project={clientProject} projectSetter={setClientProject}
                onFormSubmit={onFormSubmit} />
        </div>
    )
}

export default ProjectEdit;
