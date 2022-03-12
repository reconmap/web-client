import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import ExternalLink from 'components/ui/ExternalLink';
import LoadingTableRow from 'components/ui/tables/LoadingTableRow';
import NoResultsTableRow from 'components/ui/tables/NoResultsTableRow';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import { IconExtensions } from '../ui/Icons';
import Title from "../ui/Title";

const SystemIntegrationsPage = () => {
    const [integrations] = useFetch('/system/integrations')

    return <div>
        <PageTitle value="Integrations" />
        <div className='heading'>
            <Breadcrumb>
                <div>System</div>
            </Breadcrumb>
        </div>
        <Title title="Integrations" icon={<IconExtensions />} />

        <Table>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Description</Th>
                    <Th>External URL</Th>
                    <Th>Configured?</Th>
                    <Th>&nbsp;</Th>
                </Tr>
            </Thead>
            <Tbody>
                {null === integrations && <LoadingTableRow numColumns={5} />}
                {null !== integrations && 0 === integrations.length && <NoResultsTableRow numColumns={5} />}
                {null !== integrations && 0 !== integrations.length && integrations.map((integration, index) =>
                    <Tr key={index}>
                        <Td>{integration.name}</Td>
                        <Td>{integration.description}</Td>
                        <Td><ExternalLink href={integration.externalUrl}>{integration.externalUrl}</ExternalLink></Td>
                        <Td>{integration.configured ? 'Yes' : 'No'}</Td>
                        <Td>-</Td>
                    </Tr>
                )}
            </Tbody>
        </Table>
    </div>
}

export default SystemIntegrationsPage;
