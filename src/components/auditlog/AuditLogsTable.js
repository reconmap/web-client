import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Badge from 'components/badges/Badge';
import UserRoleBadge from 'components/badges/UserRoleBadge';
import EmptyField from 'components/ui/EmptyField';
import Ipv4Link from 'components/ui/Ipv4Link';
import NoResultsTableRow from 'components/ui/tables/NoResultsTableRow';
import UserAgentLabel from 'components/ui/UserAgentLabel';
import UserLink from 'components/users/Link';

const AuditLogsTable = ({ auditLog, hideUserColumns = false }) => {
    const hasUserLocations = auditLog.some(entry => entry.hasOwnProperty("user_location"));
    const numColumns = 4 + (hideUserColumns ? 0 : 2) + (hasUserLocations ? 1 : 0);

    return <Table size="sm">
        <Thead>
            <Tr>
                {/** Who */}
                {!hideUserColumns &&
                    <>
                        <Th>User</Th>
                        <Th>Role</Th>
                    </>
                }
                <Th>IP address</Th>
                {hasUserLocations && <Th>Location</Th>}
                <Th>User agent</Th>
                {/** What */}
                <Th>Event</Th>
                <Th>Data</Th>
                {/** When */}
                <Th>Date/Time</Th>
            </Tr>
        </Thead>
        <Tbody>
            {auditLog !== null && auditLog.length === 0 && <NoResultsTableRow numColumns={numColumns} />}
            {auditLog !== null && auditLog.map(entry => {
                return <Tr key={entry.id}>
                    {!hideUserColumns &&
                        <>
                            <Td>{entry.user_name ?
                                <UserLink userId={entry.user_id}>{entry.user_name}</UserLink> : '-'}</Td>
                            <Td><UserRoleBadge role={entry.user_role} /></Td>
                        </>
                    }
                    <Td><Ipv4Link value={entry.client_ip} /></Td>
                    {hasUserLocations && <Td>{entry.user_location ? entry.user_location : <EmptyField />}</Td>}
                    <Td>{entry.user_agent ? <UserAgentLabel userAgent={entry.user_agent} /> : '-'}</Td>
                    <Td>
                        <Badge>{entry.action}</Badge>
                    </Td>
                    <Td>{entry.object}</Td>
                    <Td>{entry.insert_ts}</Td>
                </Tr>
            })}
        </Tbody>
    </Table>
}

export default AuditLogsTable;
