import { Table, Thead } from '@chakra-ui/react';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import ClientLink from "../clients/Link";
import DeleteButton from "../ui/buttons/Delete";
import LinkButton from "../ui/buttons/Link";
import NoResults from "../ui/NoResults";
import ProjectBadge from './ProjectBadge';

const ProjectsTable = ({ projects, destroy = null }) => {
    return <Table>
        <Thead>
            <tr>
                <th style={{ width: '190px' }}>Name</th>
                <th>Client</th>
                <th className='only-desktop'>Description</th>
                <th>Rules of engagement</th>
                <th>Status</th>
                <th>&nbsp;</th>
            </tr>
        </Thead>
        <tbody>
            {projects.length === 0 ?
                <tr>
                    <td colSpan="5"><NoResults /></td>
                </tr> :
                projects.map((project) =>
                    <tr key={project.id}>
                        <td>
                            <ProjectBadge project={project} />
                        </td>
                        <td><ClientLink clientId={project.client_id}>{project.client_name}</ClientLink></td>
                        <td className='only-desktop truncate'>{project.description}</td>
                        <td>{project.engagement_type ? 'Type: ' + project.engagement_type : '(undefined)'}</td>
                        <td>{project.archived ? 'Archived' : 'Active'}</td>
                        <td className='flex justify-end'>
                            <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                                <LinkButton href={`/projects/${project.id}/edit`}>Edit</LinkButton>
                                {destroy &&
                                    <DeleteButton onClick={() => destroy(project.id)} />
                                }
                            </RestrictedComponent>
                        </td>
                    </tr>
                )}
        </tbody>
    </Table>
}

export default ProjectsTable;
