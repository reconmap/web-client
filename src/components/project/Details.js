import React from 'react'
import DeleteButton from '../ui/buttons/Delete';
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import Breadcrumb from '../ui/Breadcrumb';
import { IconClipboardCheck } from '../icons';
import ProjectTargets from './Targets';
import ProjectTasks from './Tasks';
import ProjectVulnerabilities from './Vulnerabilities';
import ProjectDescription from './Description';
import ProjectTeam from './Team';

const ProjectDetails = ({ match, history }) => {
    useSetTitle('Project');
    const [project, updateProject] = useFetch(`/projects/${match.params.id}`)
    const [tasks] = useFetch(`/projects/${match.params.id}/tasks`)
    const [targets] = useFetch(`/projects/${match.params.id}/targets`)
    const [vulnerabilities] = useFetch(`/projects/${match.params.id}/vulnerabilities`)
    const [users] = useFetch(`/projects/${match.params.id}/users`)
    const destroy = useDelete(`/projects/`, updateProject);

    const handleAddTask = () => { history.push(`/project/${match.params.id}/tasks/create`) }
    const handleAddTarget = () => { history.push(`/project/${match.params.id}/targets/create`) }
    const handleGenerateReport = () => { history.push(`/project/${project.id}/report`) }
    const handleGoBack = () => { history.goBack() }

    return (
        <>
            <section className='heading' >
                <Breadcrumb goBack={handleGoBack} path={history.location.pathname} />
                <div className='flex items-center justify-between gap-4'>
                    <DeleteButton onClick={() => destroy(project.id)} />
                    <button onClick={handleGenerateReport}><IconClipboardCheck styling='mr-2' /> Generate Report</button>
                </div>
            </section>
            {!project ? <Loading /> :
                <>
                    <h2>Project</h2>
                    <h1>{project.name}</h1>
                    <ProjectDescription project={project} />
                    <ProjectTeam project={project} users={users} />
                    <ProjectTargets project={project} targets={targets} handleAddTarget={handleAddTarget} />
                    <ProjectTasks tasks={tasks} handleAddTask={handleAddTask} />
                    <ProjectVulnerabilities vulnerabilities={vulnerabilities} />
                </>
            }
        </>
    )
}

export default ProjectDetails