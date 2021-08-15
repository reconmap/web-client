import { HStack, Select } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import { useCallback, useEffect, useState } from 'react';
import secureApiFetch from 'services/api';
import useDelete from '../../hooks/useDelete';
import Breadcrumb from '../ui/Breadcrumb';
import CreateButton from '../ui/buttons/Create';
import { IconFolder } from '../ui/Icons';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import ProjectsTable from './Table';


const ProjectsList = ({ history }) => {
    const [projects, setProjects] = useState([]);
    const [statusFilter, setStatusFilter] = useState('active');

    const handleCreateProject = () => {
        history.push('/projects/create')
    }

    const onStatusFilterChange = ev => {
        setStatusFilter(ev.target.value);
    }

    const reloadProjects = useCallback(() => {
        let url = '/projects';
        if (statusFilter.length) {
            url += '?status=' + statusFilter;
        }
        secureApiFetch(url)
            .then(resp => resp.json())
            .then(json => {
                setProjects(json);
            });
    }, [statusFilter])

    const destroy = useDelete('/projects/', reloadProjects);

    useEffect(() => {
        reloadProjects();
    }, [statusFilter, reloadProjects]);

    return <div>
        <PageTitle value="Projects" />
        <div className='heading'>
            <Breadcrumb />
            <HStack>
                <div>
                    <label>Status
                        <Select onChange={onStatusFilterChange} defaultValue="active">
                            <option value="">(any)</option>
                            <option value="active">Active</option>
                            <option value="archived">Archived</option>
                        </Select>
                    </label>
                </div>
                <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                    <CreateButton onClick={handleCreateProject}> Create Project</CreateButton>
                </RestrictedComponent>
            </HStack>
        </div>
        <Title title='Projects' icon={<IconFolder />} />
        {!projects ? <Loading /> : <ProjectsTable projects={projects} destroy={destroy} />}
    </div>
}

export default ProjectsList;
