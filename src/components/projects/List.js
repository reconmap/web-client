import PageTitle from 'components/logic/PageTitle';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import CreateButton from '../ui/buttons/Create';
import { IconFolder } from '../ui/Icons';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import ProjectsTable from './Table';

const ProjectsList = ({ history }) => {
    const [projects, updateProjects] = useFetch('/projects')
    const destroy = useDelete('/projects/', updateProjects);

    const handleCreateProject = () => {
        history.push('/projects/create')
    }

    return <div>
        <PageTitle value="Projects" />
        <div className='heading'>
            <Breadcrumb />
            <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                <CreateButton onClick={handleCreateProject}> Create Project</CreateButton>
            </RestrictedComponent>
        </div>
        <Title title='Projects' icon={<IconFolder />} />
        {!projects ? <Loading /> : <ProjectsTable projects={projects} destroy={destroy} />}
    </div>
}


export default ProjectsList
