import useSetTitle from '../../hooks/useSetTitle';
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import ProjectBadge from '../badges/ProjectBadge';
import CreateButton from '../ui/buttons/Create';
import DeleteButton from "../ui/buttons/Delete";
import {ClientLink} from "../clients/Link";
import Timestamps from '../ui/Timestamps';
import Title from '../ui/Title';
import {IconFolder} from '../ui/Icons';
import NoResults from "../ui/NoResults";
import LinkButton from "../ui/buttons/Link";

const ProjectsList = ({history}) => {
    useSetTitle('Projects');
    const [projects, updateProjects] = useFetch('/projects')
    const destroy = useDelete('/projects/', updateProjects);

    const handleCreateProject = () => {
        history.push('/projects/create')
    }

    return <div>
        <div className='heading'>
            <Breadcrumb/>
            <CreateButton onClick={handleCreateProject}> Create Project</CreateButton>
        </div>
        <Title title='Projects' icon={<IconFolder/>}/>
        {!projects ? <Loading/> :
            <table>
                <thead>
                <tr>
                    <th style={{width: '190px'}}>Name</th>
                    <th className='w-32'>Client</th>
                    <th className='w-32'>Timestamps</th>
                    <th className='w-20'></th>
                </tr>
                </thead>
                <tbody>
                {projects.length === 0 ?
                    <tr>
                        <td colSpan="4"><NoResults/></td>
                    </tr> :
                    projects.map((project) =>
                        <tr key={project.id}>
                            <td>
                                <ProjectBadge project={project}/>
                                <p>{project.description}</p>
                            </td>
                            <td><ClientLink clientId={project.client_id}>{project.client_name}</ClientLink></td>
                            <td><Timestamps insertTs={project.insert_ts} updateTs={project.update_ts}/></td>
                            <td style={{display: 'flex'}}>
                                <LinkButton href={`/projects/${project.id}/edit`}>Edit</LinkButton>
                                <DeleteButton onClick={() => destroy(project.id)}/>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        }
    </div>
}


export default ProjectsList
