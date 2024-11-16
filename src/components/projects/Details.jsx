import NativeButton from "components/form/NativeButton";
import NativeButtonGroup from "components/form/NativeButtonGroup";
import NativeTabs from "components/form/NativeTabs";
import RestrictedComponent from "components/logic/RestrictedComponent";
import DeleteButton from "components/ui/buttons/Delete.jsx";
import { actionCompletedToast } from "components/ui/toast";
import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "services/api";
import useDelete from "../../hooks/useDelete";
import useFetch from "../../hooks/useFetch";
import LinkButton from "../ui/buttons/Link";
import SecondaryButton from "../ui/buttons/Secondary";
import Loading from "../ui/Loading";
import Title from "../ui/Title";
import ProjectAttachmentsTab from "./AttachmentsTab";
import ProjectDetailsTab from "./DetailsTab";
import ProjectNotesTab from "./NotesTab";
import ProjectTargets from "./Targets";
import ProjectTasks from "./Tasks";
import ProjectTeam from "./Team";
import ProjectVaultTab from "./vault/VaultTab";
import ProjectVulnerabilities from "./Vulnerabilities";

const ProjectDetails = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();

    const [project, updateProject] = useFetch(`/projects/${projectId}`);
    const [users] = useFetch(`/projects/${projectId}/users`);
    const destroy = useDelete(`/projects/`, updateProject);

    const [tabIndex, tabIndexSetter] = useState(0);

    const handleGenerateReport = () => {
        navigate(`/projects/${project.id}/report`);
    };

    const handleManageTeam = () => {
        navigate(`/projects/${project.id}/membership`);
    };

    const onArchiveButtonClick = (project) => {
        secureApiFetch(`/projects/${project.id}`, {
            method: "PATCH",
            body: JSON.stringify({ archived: !project.archived }),
        })
            .then(() => {
                updateProject();
                actionCompletedToast("The project has been updated.");
            })
            .catch((err) => console.error(err));
    };

    if (project && project.is_template) {
        return <Navigate to={`/projects/templates/${project.id}`} />;
    }

    return (
        <>
            <div className="heading">
                <div>
                    <Link to="/projects">Projects</Link>
                </div>
                {project && (
                    <>
                        <ProjectTeam project={project} users={users} />

                        <NativeButtonGroup>
                            <RestrictedComponent roles={["administrator", "superuser", "user"]}>
                                {!project.archived && (
                                    <>
                                        <LinkButton href={`/projects/${project.id}/edit`}>Edit</LinkButton>
                                        <SecondaryButton onClick={handleGenerateReport}>Report</SecondaryButton>
                                        <SecondaryButton onClick={handleManageTeam}>Membership</SecondaryButton>
                                    </>
                                )}

                                <NativeButton onClick={() => onArchiveButtonClick(project)}>
                                    {project.archived ? "Unarchive" : "Archive"}
                                </NativeButton>
                                <DeleteButton onClick={() => destroy(project.id)}>Delete</DeleteButton>
                            </RestrictedComponent>
                        </NativeButtonGroup>
                    </>
                )}
            </div>
            {!project ? (
                <Loading />
            ) : (
                <>
                    <Title type="Project" title={project.name} />

                    <NativeTabs
                        labels={["Details", "Targets", "Tasks", "Vulnerabilities", "Comments", "Attachments", "Vault"]}
                        tabIndex={tabIndex}
                        tabIndexSetter={tabIndexSetter}
                    />

                    <div>
                        {0 === tabIndex && (
                            <div>
                                <ProjectDetailsTab project={project} />
                            </div>
                        )}
                        {1 === tabIndex && (
                            <div>
                                <ProjectTargets project={project} />
                            </div>
                        )}
                        {2 === tabIndex && (
                            <div>
                                <ProjectTasks project={project} />
                            </div>
                        )}
                        {3 === tabIndex && (
                            <div>
                                <ProjectVulnerabilities project={project} />
                            </div>
                        )}
                        {4 === tabIndex && (
                            <div>
                                <ProjectNotesTab project={project} />
                            </div>
                        )}
                        {5 === tabIndex && (
                            <div>
                                <ProjectAttachmentsTab project={project} />
                            </div>
                        )}
                        {6 === tabIndex && (
                            <div>
                                <ProjectVaultTab project={project} />
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default ProjectDetails;
