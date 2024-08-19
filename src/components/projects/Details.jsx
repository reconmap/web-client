import {
    ButtonGroup,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorMode,
} from "@chakra-ui/react";
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageTitle from "components/logic/PageTitle";
import RestrictedComponent from "components/logic/RestrictedComponent";
import { actionCompletedToast } from "components/ui/toast";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "services/api";
import useDelete from "../../hooks/useDelete";
import useFetch from "../../hooks/useFetch";
import Breadcrumb from "../ui/Breadcrumb";
import LinkButton from "../ui/buttons/Link";
import SecondaryButton from "../ui/buttons/Secondary";
import { IconClipboardCheck, IconFolder, IconUserGroup } from "../ui/Icons";
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
    const { colorMode } = useColorMode();

    const [project, updateProject] = useFetch(`/projects/${projectId}`);
    const [users] = useFetch(`/projects/${projectId}/users`);
    const destroy = useDelete(`/projects/`, updateProject);

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
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                </Breadcrumb>
                {project && (
                    <>
                        <PageTitle value={`${project.name} project`} />
                        <ProjectTeam project={project} users={users} />

                        <ButtonGroup isAttached>
                            <RestrictedComponent
                                roles={["administrator", "superuser", "user"]}
                            >
                                {!project.archived && (
                                    <>
                                        <LinkButton
                                            href={`/projects/${project.id}/edit`}
                                        >
                                            Edit
                                        </LinkButton>
                                        <SecondaryButton
                                            onClick={handleGenerateReport}
                                            leftIcon={<IconClipboardCheck />}
                                        >
                                            Report
                                        </SecondaryButton>
                                        <SecondaryButton
                                            onClick={handleManageTeam}
                                            leftIcon={<IconUserGroup />}
                                        >
                                            Membership
                                        </SecondaryButton>
                                    </>
                                )}

                                <Menu>
                                    <MenuButton
                                        as={IconButton}
                                        aria-label="Options"
                                        icon={
                                            <FontAwesomeIcon
                                                icon={faEllipsis}
                                            />
                                        }
                                        variant="outline"
                                    />
                                    <MenuList>
                                        <MenuItem
                                            onClick={() =>
                                                onArchiveButtonClick(project)
                                            }
                                        >
                                            {project.archived
                                                ? "Unarchive"
                                                : "Archive"}
                                        </MenuItem>
                                        <MenuItem
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            }
                                            color={
                                                colorMode === "light"
                                                    ? "red.500"
                                                    : "red.400"
                                            }
                                            onClick={() => destroy(project.id)}
                                        >
                                            Delete
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </RestrictedComponent>
                        </ButtonGroup>
                    </>
                )}
            </div>
            {!project ? (
                <Loading />
            ) : (
                <>
                    <Title
                        title={project.name}
                        type="Project"
                        icon={<IconFolder />}
                    />

                    <Tabs>
                        <TabList>
                            <Tab>Details</Tab>
                            <Tab>Targets</Tab>
                            <Tab>Tasks</Tab>
                            <Tab>Vulnerabilities</Tab>
                            <Tab>Comments</Tab>
                            <Tab>Attachments</Tab>
                            <Tab>Vault</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <ProjectDetailsTab project={project} />
                            </TabPanel>
                            <TabPanel>
                                <ProjectTargets project={project} />
                            </TabPanel>
                            <TabPanel>
                                <ProjectTasks project={project} />
                            </TabPanel>
                            <TabPanel>
                                <ProjectVulnerabilities project={project} />
                            </TabPanel>
                            <TabPanel>
                                <ProjectNotesTab project={project} />
                            </TabPanel>
                            <TabPanel>
                                <ProjectAttachmentsTab project={project} />
                            </TabPanel>
                            <TabPanel>
                                <ProjectVaultTab project={project} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </>
            )}
        </>
    );
};

export default ProjectDetails;
