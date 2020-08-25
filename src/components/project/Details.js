import React from 'react'
import { Link } from 'react-router-dom';
import UserBadge from '../badges/UserBadge';
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
    const handleGenerateReport = () => { history.push(`/project/${project.id}/report`) }
    const handleGoBack = () => { history.goBack() }

    return (
        <>
            <Breadcrumb goBack={handleGoBack} path={history.location.pathname} />
            {!project ? <Loading /> :
                <>
                    <section className='heading' >
                        <h1 className='mr-auto'>{project.name}</h1>
                        <div className='flex items-center justify-between gap-4'>
                            <button onClick={handleGenerateReport}><IconClipboardCheck styling='mr-2' /> Generate Report</button>
                            <DeleteButton onClick={() => destroy(project.id)} />
                        </div>
                    </section>
                    <section className='grid lg:grid-cols-3 gap-4 my-4'>
                        <ProjectDescription description={project.description}/>
                        <ProjectTargets targets={targets} />
                        <ProjectVulnerabilities vulnerabilities={vulnerabilities} />
                    </section>
                    <section className='grid lg:grid-cols-3 gap-4 my-4'>
                        <ProjectTeam />
                        <ProjectTasks tasks={tasks} handleAddTask={handleAddTask}/>
                    </section>
                </>
            }
        </>
    )
}

export default ProjectDetails

const ProjectTasks = ({tasks, handleAddTask}) => {

    return <article className='base'>
            <h2>Tasks <small>1/{tasks && tasks.length} completed</small></h2>
            {tasks ?
                <div className='flex flex-col gap-2 mb-2'>
                    {tasks.map((task, index) =>
                        <div className='flex flex-row items-center justify-start'>
                            <input type="checkbox" checked="checked" readOnly className='mr-4' />
                            <Link to={"/tasks/" + task.id}>{task.name}</Link>
                            <Link className=' ml-auto' to={"/tasks/" + task.id + "/upload"}><button className='w-20'>Upload results</button></Link>
                        </div>
                    )
                    }
                </div> : <Loading />}
            <footer>
                <button onClick={handleAddTask}>Add task</button>
            </footer>
        </article>
}
const ProjectTargets = ({ targets }) => {
    return <div className='base'>
        <h2>Target(s)</h2>
        {targets ? <table className='font-mono text-sm w-full' >
            <thead>
                <tr><th>Host</th><th>uri</th></tr>
            </thead>
            <tbody>
                {targets.map((target, index) => <tr key={index}><td>{target.kind}</td><td>{target.name}</td></tr> )}
            </tbody>
        </table> : <Loading />}
    </div>
}

const ProjectVulnerabilities = ({vulnerabilities}) => {
    return <div className='base'>
        <h2>Vulnerabilities</h2>
        {vulnerabilities ?
            <ul>
                {vulnerabilities.map((vuln, index) => <li key={index}>{vuln.summary}</li> )}
            </ul> : <Loading />}
        <footer>
            <button href="add.html" >Add New Vulnerability</button>
        </footer>
    </div>
}

const ProjectDescription = ({ description } ) => {
    return <div className='base'>
            <h2>Description</h2>
            <p>{description}</p>
        </div>
}

const ProjectTeam = () => {
    return <article className='base'>
                <h2>Team</h2>
                <div className='flex flex-wrap'>
                    <UserBadge name='Santiago Lizardo' role='Full Stack Dev' />
                </div>
            </article>
}