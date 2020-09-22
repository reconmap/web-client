import React from 'react'
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import Breadcrumb from '../ui/Breadcrumb';
import {IconClipboardCheck, IconUserGroup} from '../icons';
import ProjectTargets from './Targets';
import ProjectTasks from './Tasks';
import ProjectVulnerabilities from './Vulnerabilities';
import ProjectDescription from './Description';
import ProjectTeam from './Team';
import Title from '../ui/Title';
import BtnSecondary from '../ui/buttons/BtnSecondary';
import DeleteButton from "../ui/buttons/Delete";
import ButtonGroup from "../ui/buttons/ButtonGroup";

const ProjectDetails = ({match, history}) => {
    useSetTitle('Project');
    const [project, updateProject] = useFetch(`/projects/${match.params.id}`)
    const [tasks] = useFetch(`/projects/${match.params.id}/tasks`)
    const [targets] = useFetch(`/projects/${match.params.id}/targets`)
    const [vulnerabilities] = useFetch(`/projects/${match.params.id}/vulnerabilities`)
    const [users] = useFetch(`/projects/${match.params.id}/users`)
    const destroy = useDelete(`/projects/`, updateProject);

    const handleAddTask = () => {
        history.push(`/projects/${match.params.id}/tasks/create`)
    }
    const handleAddTarget = () => {
        history.push(`/projects/${match.params.id}/targets/create`)
    }
    const handleGenerateReport = () => {
        history.push(`/projects/${project.id}/report`)
    }
    const handleGoBack = () => {
        history.goBack()
    }
    const handleManageTeam = () => {
        history.push(`/projects/${project.id}/membership`)
    }
    return (
        <>
            <div className='heading'>
                <Breadcrumb goBack={handleGoBack} path={history.location.pathname}/>
                <ProjectTeam project={project} users={users}/>


                <ButtonGroup>
                    <BtnSecondary size='sm' onClick={handleGenerateReport}><IconClipboardCheck size={4}
                                                                                               styling='mr-2'/> Generate
                        Report</BtnSecondary>
                    <BtnSecondary
                        size='sm'
                        color='gray'
                        onClick={handleManageTeam}>
                        <IconUserGroup size={4} color='gray' styling='ml-2'/>
                        Manage Members
                    </BtnSecondary>
                    <DeleteButton size="sm" onClick={() => destroy(project.id)}/>
                </ButtonGroup>
            </div>
            {!project ? <Loading/> :
                <>
                    <Title title={project.name} type='Project'/>
                    <ProjectDescription project={project}/>
                    <ProjectTargets project={project} targets={targets} handleAddTarget={handleAddTarget}/>
                    <ProjectTasks tasks={tasks} handleAddTask={handleAddTask}/>
                    <ProjectVulnerabilities project={project} vulnerabilities={vulnerabilities}/>
                </>
            }
        </>
    )
}

export default ProjectDetails