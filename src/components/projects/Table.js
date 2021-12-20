import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import DeleteIconButton from 'components/ui/buttons/DeleteIconButton';
import ClientLink from "../clients/Link";
import LinkButton from "../ui/buttons/Link";
import NoResults from "../ui/NoResults";
import ProjectBadge from './ProjectBadge';

const ProjectsTable = ({ projects, destroy = null, showClientColumn = true }) => {
    return <Table size="sm">
        <Thead>
            <Tr>
                <Th>Name</Th>
                {showClientColumn && <Th>Client</Th>}
                <Th className='only-desktop'>Description</Th>
                <Th>Rules of engagement</Th>
                <Th>Status</Th>
                <Th>&nbsp;</Th>
            </Tr>
        </Thead>
        <Tbody>
            {projects.length === 0 ?
                <Tr>
                    <Td colSpan={5}><NoResults /></Td>
                </Tr> :
                projects.map((project) =>
                    <Tr key={project.id}>
                        <Td>
                            <ProjectBadge project={project} />
                        </Td>
                        {showClientColumn &&
                            <Td>{project.is_template ?
                                <span title="Not applicable">(n/a)</span> :
                                <ClientLink clientId={project.client_id}>{project.client_name}</ClientLink>}
                            </Td>
                        }
                        <Td className='only-desktop truncate'>{project.description}</Td>
                        <Td>{project.engagement_type ? 'Type: ' + project.engagement_type : '(undefined)'}</Td>
                        <Td>{project.archived ? 'Archived' : 'Active'}</Td>
                        <Td className='flex justify-end'>
                            <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                                <LinkButton href={`/projects/${project.id}/edit`}>Edit</LinkButton>
                                {destroy &&
                                    <DeleteIconButton onClick={() => destroy(project.id)} />
                                }
                            </RestrictedComponent>
                        </Td>
                    </Tr>
                )}
        </Tbody>
    </Table>
}

export default ProjectsTable;
