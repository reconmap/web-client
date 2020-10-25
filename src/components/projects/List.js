import useSetTitle from '../../hooks/useSetTitle';
import NoResults from '../ui/NoResults';
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import ProjectBadge from '../badges/ProjectBadge';
import CreateButton from '../ui/buttons/Create';
import DeleteButton from "../ui/buttons/Delete";
import {ClientLink} from "../clients/Link";
import Timestamps from '../ui/Timestamps';

const ProjectsList = ({history}) => {
    useSetTitle('Projects');
    const [projects, updateProjects] = useFetch('/projects')
    const destroy = useDelete('/projects/', updateProjects);
    const handleCreateProject = () => {
        history.push('/projects/create')
    }
    return <div>
        <div className='heading'>
            <Breadcrumb history={history}/>
            <CreateButton onClick={handleCreateProject}> Create Project</CreateButton>
        </div>
        {!projects ? <Loading/> : projects.length === 0 ? <NoResults/> :
            <table className='w-full table-fixed'>
                <thead>
                <tr>
                    <th className='w-56'>Name</th>
                    <th className='w-32'>Client</th>
                    <th className='w-32'>Creation date/time</th>
                    <th className='w-20'></th>
                </tr>
                </thead>
                <tbody>
                {projects.map((project) =>
                    <tr key={project.id}>
                        <td>
                        <ProjectBadge project={project}/>
                        <p>{project.description}</p>
                        </td>
                        
                        <td><ClientLink clientId={project.client_id}>{project.client_name}</ClientLink></td>
                        <td><Timestamps insertTs={project.insert_ts} /></td>
                        <td>
                            <DeleteButton onClick={() => destroy(project.id)}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>}
    </div>
}


export default ProjectsList
