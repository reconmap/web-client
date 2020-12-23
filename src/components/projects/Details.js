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
import EditButton from "../ui/buttons/Edit";
import {Link} from "react-router-dom";
import {useState} from 'react';
import Tabs from "../ui/Tabs";

const ProjectDetails = ({match, history}) => {
    useSetTitle('Project');
    const [project, updateProject] = useFetch(`/projects/${match.params.id}`)
    const [tasks] = useFetch(`/projects/${match.params.id}/tasks`)
    const [targets] = useFetch(`/projects/${match.params.id}/targets`)
    const [vulnerabilities] = useFetch(`/projects/${match.params.id}/vulnerabilities`)
    const [users] = useFetch(`/projects/${match.params.id}/users`)
    const destroy = useDelete(`/projects/`, updateProject);
    const [currentTab, setCurrentTab] = useState('details')

    const projectId = match.params.id;

    const handleAddTask = () => {
        history.push(`/tasks/create?projectId=${projectId}`)
    }

    const handleAddTarget = () => {
        history.push(`/projects/${projectId}/targets/create`)
    }

    const handleGenerateReport = () => {
        history.push(`/projects/${project.id}/report`)
    }

    const handleManageTeam = () => {
        history.push(`/projects/${project.id}/membership`)
    }

    const onEditButtonClick = (ev, project) => {
        ev.preventDefault();

        history.push(`/projects/${project.id}/edit`);
    };

    const handleChangeTab = (e) => {
        setCurrentTab(e.target.name)
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
                        <EditButton onClick={(ev) => onEditButtonClick(ev, project)}/>
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
                    </Tabs>

                    {currentTab === 'details' && <ProjectDetailsTab project={project}/>}
                    {currentTab === 'targets' &&
                    <ProjectTargets project={project} targets={targets} handleAddTarget={handleAddTarget}/>}
                    {currentTab === 'tasks' && <ProjectTasks tasks={tasks} handleAddTask={handleAddTask}/>}
                    {currentTab === 'vulnerabilities' &&
                    <ProjectVulnerabilities project={project} vulnerabilities={vulnerabilities}/>}
                </>
            }
        </>
    )
}

export default ProjectDetails;
