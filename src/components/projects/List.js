import React from 'react'
import useSetTitle from '../../hooks/useSetTitle';
import NoResults from '../ui/NoResults';
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import ProjectBadge from '../badges/ProjectBadge';
import BtnPrimary from '../ui/buttons/BtnPrimary';
import { IconPlus, IconX } from '../icons';
import BtnSecondary from '../ui/buttons/BtnSecondary';

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
            <BtnPrimary onClick={handleCreateProject}> <IconPlus styling='mr-2' /> Create Project</BtnPrimary>
        </div>
        {!projects ? <Loading /> : projects.length === 0 ? <NoResults /> :
            <table className='w-full'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Creation date/time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) =>
                        <tr key={project.id}>
                            <td><ProjectBadge project={project} /></td>
                            <td><small>{project.description}</small></td>
                            <td>{project.insert_ts}</td>
                            <td className='text-right'>
                                <BtnSecondary size='xs' onClick={() => destroy(project.id)}>
                                    <IconX styling='mr-2' size={4}/> Delete
                                </BtnSecondary>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>}
    </div>
}


export default ProjectsList
