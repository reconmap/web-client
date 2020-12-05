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
import Title from '../ui/Title';
import BtnSecondary from '../ui/buttons/BtnSecondary';
import DeleteButton from "../ui/buttons/Delete";
import ButtonGroup from "../ui/buttons/ButtonGroup";
import Timestamps from "../ui/Timestamps";
import EditButton from "../ui/buttons/Edit";
import {Link} from "react-router-dom";

const ProjectDetails = ({match, history}) => {
    useSetTitle('Project');
    const [project, updateProject] = useFetch(`/projects/${match.params.id}`)
    const [tasks] = useFetch(`/projects/${match.params.id}/tasks`)
    const [targets] = useFetch(`/projects/${match.params.id}/targets`)
    const [vulnerabilities] = useFetch(`/projects/${match.params.id}/vulnerabilities`)
    const [users] = useFetch(`/projects/${match.params.id}/users`)
    const destroy = useDelete(`/projects/`, updateProject);

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
                        <BtnSecondary onClick={handleGenerateReport}>
                            <IconClipboardCheck/>
                            Generate Report
                        </BtnSecondary>
                        <BtnSecondary onClick={handleManageTeam}>
                            <IconUserGroup/>
                            Manage Members
                        </BtnSecondary>
                        <DeleteButton onClick={() => destroy(project.id)}/>
                    </ButtonGroup>
                </>}
            </div>
            {!project ? <Loading/> :
                <>
                    <Title title={project.name} type={project.description} icon={<IconFolder/>}/>
                    <h4>Timestamps</h4>
                    <Timestamps insertTs={project.insert_ts} updateTs={project.update_ts}/>
                    <ProjectTargets project={project} targets={targets} handleAddTarget={handleAddTarget}/>
                    <ProjectTasks tasks={tasks} handleAddTask={handleAddTask}/>
                    <ProjectVulnerabilities project={project} vulnerabilities={vulnerabilities}/>
                </>
            }
        </>
    )
}

export default ProjectDetails
