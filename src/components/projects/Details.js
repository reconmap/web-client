import PageTitle from "components/logic/PageTitle";
import RestrictedComponent from "components/logic/RestrictedComponent";
import { actionCompletedToast } from "components/ui/toast";
import { Link } from "react-router-dom";
import secureApiFetch from "services/api";
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import ButtonGroup from "../ui/buttons/ButtonGroup";
import DeleteButton from "../ui/buttons/Delete";
import LinkButton from "../ui/buttons/Link";
import SecondaryButton from '../ui/buttons/Secondary';
import { IconClipboardCheck, IconFolder, IconUserGroup } from '../ui/Icons';
import Loading from '../ui/Loading';
import Tab from "../ui/Tab";
import Tabs from "../ui/Tabs";
import Title from '../ui/Title';
import ProjectAttachmentsTab from './AttachmentsTab';
import ProjectDetailsTab from './DetailsTab';
import ProjectNotesTab from "./NotesTab";
import ProjectTargets from './Targets';
import ProjectTasks from './Tasks';
import ProjectTeam from './Team';
import ProjectVulnerabilities from './Vulnerabilities';

const ProjectDetails = ({ match, history }) => {
    const projectId = match.params.id;

    const [project, updateProject] = useFetch(`/projects/${projectId}`)
    const [users] = useFetch(`/projects/${projectId}/users`)
    const destroy = useDelete(`/projects/`, updateProject);

    const handleGenerateReport = () => {
        history.push(`/projects/${project.id}/report`)
    }

    const handleManageTeam = () => {
        history.push(`/projects/${project.id}/membership`)
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

    return (
        <>
            <PageTitle value="Project" />
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                </Breadcrumb>
                {project && <>
                    <ProjectTeam project={project} users={users} />

                    <ButtonGroup>
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
                        <Tab name="Details"><ProjectDetailsTab project={project} /></Tab>
                        <Tab name="Targets"><ProjectTargets project={project} /></Tab>
                        <Tab name="Tasks"><ProjectTasks project={project} /></Tab>
                        <Tab name="Vulnerabilities"><ProjectVulnerabilities project={project} /></Tab>
                        <Tab name="Notes"><ProjectNotesTab project={project} /></Tab>
                        <Tab name="Attachments"><ProjectAttachmentsTab project={project} /></Tab>
                    </Tabs>
                </>
            }
        </>
    )
};

export default ProjectDetails;
