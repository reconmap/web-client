import { actionCompletedToast, errorToast } from "components/ui/toast";
import useQuery from "hooks/useQuery";
import { StatusCodes } from "http-status-codes";
import Project from "models/Project";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import secureApiFetch from "../../services/api";
import Breadcrumb from "../ui/Breadcrumb";
import Title from "../ui/Title";
import ProjectForm from "./Form";

const ProjectCreate = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const isTemplate = "true" === query.get("isTemplate");
    const [newProject, setNewProject] = useState({ ...Project, is_template: isTemplate });

    const handleCreate = async (ev) => {
        ev.preventDefault();

        secureApiFetch(`/projects`, { method: "POST", body: JSON.stringify(newProject) }).then((resp) => {
            if (resp.status !== StatusCodes.CREATED) {
                errorToast("There was a problem creating the project. Please check the form and try again");
                return;
            }

            actionCompletedToast(`The project '${newProject.name}' has been created`);

            if (newProject.is_template) {
                navigate("/projects/templates");
            } else {
                navigate("/projects");
            }
        });
    };

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                </Breadcrumb>
            </div>
            <Title title="New project details" />

            <ProjectForm project={newProject} projectSetter={setNewProject} onFormSubmit={handleCreate} />
        </div>
    );
};

export default ProjectCreate;
