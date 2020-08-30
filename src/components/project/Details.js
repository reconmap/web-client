import React from 'react'
import DeleteButton from '../ui/buttons/Delete';
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import Breadcrumb from '../ui/Breadcrumb';
import { IconClipboardCheck } from '../icons';
import TasksTable from '../tables/TasksTable';
import VulnerabilitiesTable from '../tables/VulnerabilitiesTable';
import { Link } from 'react-router-dom';

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
                    <h1>{project.name}</h1>
                    <ProjectDescription project={project} />
                    <h2>Team</h2>
                    {users && <ul>
                        {users.map((user, index) =>
                            <li><Link to={`/user/${user.id}`}>{user.name}</Link></li>
                        )}
                    </ul>}
                    <ProjectTargets targets={targets} handleAddTarget={handleAddTarget} />
                    <ProjectTasks tasks={tasks} handleAddTask={handleAddTask} />
                    <ProjectVulnerabilities vulnerabilities={vulnerabilities} />
                </>
            }
        </>
    )
}

export default ProjectDetails

const ProjectTasks = ({ tasks, handleAddTask }) => {
    return <section className='mb-10'>
        <div className='heading'>

            <h2>Tasks(s) <small>({tasks && tasks.reduce(function (total, task) { return task.completed ? total + 1 : total; }, 0)}/{tasks && tasks.length} completed)</small></h2>
            <button onClick={handleAddTask} className='sm'>Add task</button>
        </div>
        {tasks ? <TasksTable tasks={tasks} /> : <Loading />}
    </section>
}
const ProjectTargets = ({ targets, handleAddTarget }) => {
    return <section className='mb-10'>
        <h2>Target(s)</h2>
        <div className='flex flex-wrap gap-4'>
            {targets ?
                targets.map((target, index) =>
                    <div key={index} className='card reactive w-64'>
                        <h3>{target.kind}</h3>
                        <h2>{target.name}</h2>
                    </div>)
                : <Loading />}
            <div className='card outline reactive w-64' onClick={handleAddTarget}>
                <h3>Add target</h3>
            </div>
        </div>
    </section>
}

const ProjectVulnerabilities = ({ vulnerabilities }) => {
    return <section>
        <div className='heading'>
            <h2>Vulnerabilities</h2>
            <button className='sm'>Add New Vulnerability</button>
        </div>
        {vulnerabilities ? <VulnerabilitiesTable vulnerabilities={vulnerabilities} />
            : <Loading />}
    </section>
}

const ProjectDescription = ({ project }) => {
    return <div className='flex items-start justify-between'>
        <p>{project.description}</p>
        <p>Created on <date>{project.insert_ts}</date></p>
    </div>
}
