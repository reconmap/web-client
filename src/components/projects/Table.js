import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import DeleteIconButton from 'components/ui/buttons/DeleteIconButton';
import LinkButton from 'components/ui/buttons/Link';
import LoadingTableRow from 'components/ui/tables/LoadingTableRow';
import NoResultsTableRow from 'components/ui/tables/NoResultsTableRow';
import ClientLink from "../clients/Link";
import ProjectBadge from './ProjectBadge';

const ProjectsTable = ({ projects, destroy = null, showClientColumn = true }) => {
    const numColumns = showClientColumn ? 7 : 6;

    return <Table>
        <Thead>
            <Tr>
                <Th>Name</Th>
                {showClientColumn && <Th>Client</Th>}
                <Th className="only-desktop">Description</Th>
                <Th>Rules of engagement</Th>
                <Th>Vulnerability Metrics</Th>
                <Th>Status</Th>
                <Th>&nbsp;</Th>
            </Tr>
        </Thead>
        <Tbody>
            {null === projects && <LoadingTableRow numColumns={numColumns} />}
            {null !== projects && 0 === projects.length && <NoResultsTableRow numColumns={numColumns} />}
            {null !== projects && 0 !== projects.length && projects.map(project =>
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
                    <Td className="only-desktop">{project.description}</Td>
                    <Td>{project.engagement_type ? 'Type: ' + project.engagement_type : '(undefined)'}</Td>
                    <Td>{project.vulnerability_metrics ? project.vulnerability_metrics : '(undefined)'}</Td>
                    <Td>{project.archived ? 'Archived' : 'Active'}</Td>
                    <Td textAlign="right">
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
