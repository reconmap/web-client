import { ButtonGroup, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import PageTitle from "components/logic/PageTitle";
import RestrictedComponent from "components/logic/RestrictedComponent";
import { actionCompletedToast } from "components/ui/toast";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "services/api";
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import DeleteButton from "../ui/buttons/Delete";
import LinkButton from "../ui/buttons/Link";
import SecondaryButton from '../ui/buttons/Secondary';
import { IconClipboardCheck, IconFolder, IconUserGroup } from '../ui/Icons';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import ProjectAttachmentsTab from './AttachmentsTab';
import ProjectDetailsTab from './DetailsTab';
import ProjectNotesTab from "./NotesTab";
import ProjectTargets from './Targets';
import ProjectTasks from './Tasks';
import ProjectTeam from './Team';
import ProjectVulnerabilities from './Vulnerabilities';

const ProjectDetails = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();

    const [project, updateProject] = useFetch(`/projects/${projectId}`)
    const [users] = useFetch(`/projects/${projectId}/users`)
    const destroy = useDelete(`/projects/`, updateProject);

    const handleGenerateReport = () => {
        navigate(`/projects/${project.id}/report`)
    }

    const handleManageTeam = () => {
        navigate(`/projects/${project.id}/membership`)
    }

    const onArchiveButtonClick = (project) => {
        secureApiFetch(`/projects/${project.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ archived: !project.archived })
        })
            .then(() => {
                updateProject();
                actionCompletedToast('The project has been updated.');
            })
            .catch(err => console.error(err))
    }

    if (project && project.is_template) {
        return <Navigate to={`/projects/templates/${project.id}`} />
    }

    return <>
        <div className='heading'>
            <Breadcrumb>
                <Link to="/projects">Projects</Link>
            </Breadcrumb>
            {project && <>
                <PageTitle value={`${project.name} project`} />
                <ProjectTeam project={project} users={users} />

                <ButtonGroup isAttached>
                    <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                        {!project.archived && <>
                            <LinkButton href={`/projects/${project.id}/edit`}>Edit</LinkButton>
                            <SecondaryButton onClick={handleGenerateReport}>
                                <IconClipboardCheck />
                                Generate Report
                            </SecondaryButton>
                            <SecondaryButton onClick={handleManageTeam}>
                                <IconUserGroup />
                                Manage Members
                            </SecondaryButton>
                        </>}
                        <SecondaryButton onClick={() => onArchiveButtonClick(project)}>{project.archived ? 'Unarchive' : 'Archive'}</SecondaryButton>
                        <DeleteButton onClick={() => destroy(project.id)} />
                    </RestrictedComponent>
                </ButtonGroup>
            </>}
        </div>
        {!project ? <Loading /> :
            <>
                <Title title={project.name} type="Project" icon={<IconFolder />} />

                <Tabs>
                    <TabList>
                        <Tab>Details</Tab>
                        <Tab>Targets</Tab>
                        <Tab>Tasks</Tab>
                        <Tab>Vulnerabilities</Tab>
                        <Tab>Notes</Tab>
                        <Tab>Attachments</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel><ProjectDetailsTab project={project} /></TabPanel>
                        <TabPanel><ProjectTargets project={project} /></TabPanel>
                        <TabPanel><ProjectTasks project={project} /></TabPanel>
                        <TabPanel><ProjectVulnerabilities project={project} /></TabPanel>
                        <TabPanel><ProjectNotesTab project={project} /></TabPanel>
                        <TabPanel><ProjectAttachmentsTab project={project} /></TabPanel>
                    </TabPanels>
                </Tabs>
            </>
        }
    </>
};

export default ProjectDetails;
