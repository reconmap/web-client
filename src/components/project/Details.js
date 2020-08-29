import React from 'react'
import { Link } from 'react-router-dom';
import DeleteButton from '../ui/buttons/Delete';
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import Breadcrumb from '../ui/Breadcrumb';
import { IconClipboardCheck } from '../icons';

const ProjectDetails = ({ match, history }) => {
    useSetTitle('Project');
    const [project, updateProject] = useFetch(`/projects/${match.params.id}`)
    const [tasks] = useFetch(`/projects/${match.params.id}/tasks`)
    const [targets] = useFetch(`/projects/${match.params.id}/targets`)
    const [vulnerabilities] = useFetch(`/projects/${match.params.id}/vulnerabilities`)
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
    return <article className='card'>
        {tasks ?
            <>
                <h2>Tasks <small>({tasks.reduce(function (total, task) { return task.completed ? total + 1 : total; }, 0)}/{tasks && tasks.length} completed)</small></h2>
                <div className='flex flex-col gap-2 mb-2'>
                    {tasks.map((task, index) =>
                        <div className='flex flex-row items-center justify-start'>
                            {task.completed ?
                                <input type="checkbox" checked="checked" readOnly className='mr-4' />
                                :
                                <input type="checkbox" readOnly className='mr-4' />
                            }
                            <Link to={"/tasks/" + task.id}>{task.name}</Link>
                            <Link className=' ml-auto' to={"/tasks/" + task.id + "/upload"}><button className='w-20'>Upload results</button></Link>
                        </div>
                    )
                    }
                </div>
            </>
            :
            <Loading />}
        <footer>
            <button onClick={handleAddTask}>Add task</button>
        </footer>
    </article>
}
const ProjectTargets = ({ targets, handleAddTarget }) => {
    return <div className='card'>
        <h2>Target(s)</h2>
        {targets ? <table className='font-mono text-sm w-full' >
            <thead>
                <tr><th>Host</th><th>uri</th></tr>
            </thead>
            <tbody>
                {targets.map((target, index) => <tr key={index}><td>{target.kind}</td><td>{target.name}</td></tr>)}
            </tbody>
        </table>
            : <Loading />}
        <footer>
            <button onClick={handleAddTarget}>Add target</button>
        </footer>
    </div>
}

const ProjectVulnerabilities = ({ vulnerabilities }) => {
    return <div className='card'>
        <h2>Vulnerabilities</h2>
        {vulnerabilities ?
            <ul>
                {vulnerabilities.map((vuln, index) => <li key={index}>{vuln.summary}</li>)}
            </ul> : <Loading />}
        <footer>
            <button href="add.html" >Add New Vulnerability</button>
        </footer>
    </div>
}

const ProjectDescription = ({ project }) => {
    return <div className='flex items-start justify-between'>
        <p>{project.description}</p>
        <p>Created on <date>{project.insert_ts}</date></p>
    </div>
}
