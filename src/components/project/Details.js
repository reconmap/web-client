import React from 'react'
import { Link } from 'react-router-dom';
import UserBadge from '../badges/UserBadge';
import DeleteButton from '../ui/buttons/Delete';
import { IconLeft } from '../icons';
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import Breadcrumb from '../ui/Breadcrumb';

const ProjectDetails = ({match, history}) => {
    useSetTitle('Project');
    const [project, updateProject] = useFetch(`/projects/${match.params.id}`)
    const [tasks] = useFetch(`/projects/${match.params.id}/tasks`)
    const [targets] = useFetch(`/projects/${match.params.id}/targets`)
    const [vulnerabilities] = useFetch(`/projects/${match.params.id}/vulnerabilities`)
    const destroy = useDelete(`/projects/`, updateProject);

    const handleAddTask = () => { history.push(`/project/${match.params.id}/tasks/create`) }
    const handleGenerateReport = () => { history.push(`/project/${project.id}/report`) }
    const handleGoBack = () =>  {history.goBack() }

    if( !project ) { return <Loading /> }
    return (
        <>
            <Breadcrumb goBack={handleGoBack} path={history.location.pathname} />

            <section className='heading' >
                <h1 className='mr-auto'>{project.name}</h1>
                <div className='flex items-center justify-between gap-4'>
                    <button onClick={handleGenerateReport}>Generate Report</button>
                    <DeleteButton onClick={() => destroy(project.id)} />
                </div>
            </section>

            <section className='grid lg:grid-cols-3 gap-4 my-4'>
                <div className='base'>
                    <h2>Description</h2>
                    <p>{project.description}</p>
                </div>
                <div className='base'>
                    <h2>Target(s)</h2>
                    {targets ? <table className='font-mono text-sm w-full' >
                        <thead>
                            <tr><th>Host</th><th>uri</th></tr>
                        </thead>
                        <tbody>
                            {targets.map((target, index) =>
                                <tr key={index}><td>{target.kind}</td><td>{target.name}</td></tr>
                            )}
                        </tbody>
                    </table> : <Loading /> }
                </div>
                <div className='base'>
                    <h2>Vulnerabilities</h2>
                    {vulnerabilities ? 
                        <ul>
                            { vulnerabilities.map((vuln, index) =>
                                    <li key={index}>{vuln.summary}</li>
                                ) }
                        </ul>:<Loading /> }
                        <footer>

                    <button href="add.html" >Add New Vulnerability</button>
                        </footer>
                </div>
            </section>
            <section className='grid lg:grid-cols-3 gap-4 my-4'>
                <article className='base'>
                    <h2>Team</h2>
                    <div className='flex flex-wrap'>
                        <UserBadge name='Santiago Lizardo' role='Full Stack Dev' />
                    </div>
                </article>
                <article className='base'>
                    
                    <h2>Tasks <small>1/{tasks && tasks.length} completed</small></h2>
                    {tasks ? 
                    <div className='flex flex-col gap-2 mb-2'>
                        { tasks.map((task, index) =>
                            <div className='flex flex-row items-center justify-start'>
                                <input type="checkbox" checked="checked" readOnly className='mr-4'/> 
                                <Link to={"/tasks/" + task.id}>{task.name}</Link>
                                <Link className=' ml-auto' to={"/tasks/" + task.id + "/upload"}><button className='w-20'>Upload results</button></Link>
                            </div>
                            )
                        }
                    </div> : <Loading /> }
                    <footer>
                        <button onClick={handleAddTask}>Add task</button>
                    </footer>
                </article>
            </section>
        </>
    )
}

export default ProjectDetails