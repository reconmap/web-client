import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import Breadcrumb from '../ui/Breadcrumb';
import {IconClipboardCheck, IconFolder, IconUserGroup} from '../ui/Icons';
import ProjectTargets from './Targets';
import ProjectTasks from './Tasks';
import ProjectVulnerabilities from './Vulnerabilities';
import ProjectTeam from './Team';
import ProjectDetailsTab from './DetailsTab';
import Title from '../ui/Title';
import SecondaryButton from '../ui/buttons/Secondary';
import DeleteButton from "../ui/buttons/Delete";
import ButtonGroup from "../ui/buttons/ButtonGroup";
import {Link} from "react-router-dom";
import {useState} from 'react';
import Tabs from "../ui/Tabs";
import ProjectNotesTab from "./NotesTab";
import LinkButton from "../ui/buttons/Link";

const ProjectDetails = ({match, history}) => {
    useSetTitle('Project');

    const projectId = match.params.id;

    const [project, updateProject] = useFetch(`/projects/${projectId}`)
    const [users] = useFetch(`/projects/${projectId}/users`)
    const destroy = useDelete(`/projects/`, updateProject);
    const [currentTab, setCurrentTab] = useState('details')

    const handleGenerateReport = () => {
        history.push(`/projects/${project.id}/report`)
    }

    const handleManageTeam = () => {
        history.push(`/projects/${project.id}/membership`)
    }

    const handleChangeTab = (ev) => {
        setCurrentTab(ev.target.name)
    }

    return (
        <>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                </Breadcrumb>
                {project && <>
                    <ProjectTeam project={project} users={users}/>

                    <ButtonGroup>
                        <LinkButton href={`/projects/${project.id}/edit`}>Edit</LinkButton>
                        <SecondaryButton onClick={handleGenerateReport}>
                            <IconClipboardCheck/>
                            Generate Report
                        </SecondaryButton>
                        <SecondaryButton onClick={handleManageTeam}>
                            <IconUserGroup/>
                            Manage Members
                        </SecondaryButton>
                        <DeleteButton onClick={() => destroy(project.id)}/>
                    </ButtonGroup>
                </>}
            </div>
            {!project ? <Loading/> :
                <>
                    <Title title={project.name} type="Project" icon={<IconFolder/>}/>

                    <Tabs>
                        <button className={currentTab === 'details' && 'active'} name='details'
                                onClick={handleChangeTab}>Details
                        </button>
                        <button className={currentTab === 'targets' && 'active'} name='targets'
                                onClick={handleChangeTab}>Targets
                        </button>
                        <button className={currentTab === 'tasks' && 'active'} name='tasks'
                                onClick={handleChangeTab}>Tasks
                        </button>
                        <button className={currentTab === 'vulnerabilities' && 'active'} name='vulnerabilities'
                                onClick={handleChangeTab}>Vulnerabilities
                        </button>
                        <button className={currentTab === 'notes' && 'active'} name='notes'
                                onClick={handleChangeTab}>Notes
                        </button>
                    </Tabs>

                    {currentTab === 'details' && <ProjectDetailsTab project={project}/>}
                    {currentTab === 'targets' &&
                    <ProjectTargets project={project}/>}
                    {currentTab === 'tasks' && <ProjectTasks project={project}/>}
                    {currentTab === 'vulnerabilities' &&
                    <ProjectVulnerabilities project={project}/>}
                    {currentTab === 'notes' &&
                    <ProjectNotesTab project={project}/>}
                </>
            }
        </>
    )
};

export default ProjectDetails;
