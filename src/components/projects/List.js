import React from 'react'
import useSetTitle from '../../hooks/useSetTitle';
import NoResults from '../ui/NoResults';
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import CreateButton from './../ui/buttons/Create'
import Breadcrumb from '../ui/Breadcrumb';
import DeleteButton from '../ui/buttons/Delete';
import { Link } from 'react-router-dom';

const ProjectsList = ({ history }) => {
    useSetTitle('Projects');
    const [projects, updateProjects] = useFetch('/projects')
    const destroy = useDelete('/projects/', updateProjects);
    const handleCreateProject = () => {
        history.push('/projects/create')
    }
    return <div>
                <div className='heading'>
                    <Breadcrumb path={history.location.pathname} />
                    <CreateButton onClick={handleCreateProject}>Create Project</CreateButton>
                </div>
                    <h1>Projects</h1>
                {!projects ? <Loading /> : projects.length === 0 ? <NoResults /> :
                    <table className='w-full'>
                    <thead></thead>
                    <tbody>
                        {projects.map((project) =>
                            <tr key={project.id}>
                                <td><Link to={`/project/${project.id}`}>{project.name}</Link></td>
                                <td><small className='text-gray-500'>{project.description}</small></td>
                                <td>{project.insert_ts}</td>
                                <td className='text-right'><DeleteButton onClick={() => destroy(project.id)} /></td>
                            </tr>
                        )}
                    </tbody>
                    </table>}
            </div>
}


export default ProjectsList
