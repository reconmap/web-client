import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import Badge from 'components/badges/Badge';
import UserRoleBadge from 'components/badges/UserRoleBadge';
import Ipv4Link from 'components/ui/Ipv4Link';
import NoResultsTableRow from 'components/ui/NoResultsTableRow';
import UserAgentLabel from 'components/ui/UserAgentLabel';
import UserLink from 'components/users/Link';

const AuditLogsTable = ({ auditLog, hideUserColumns = false }) => {
    const numColumns = hideUserColumns ? 4 : 6;
    return <Table size="sm">
        <Thead>
            <Tr>
                <Th>Action</Th>
                <Th>IP address</Th>
                <Th>User agent</Th>
                <Th>Date/Time</Th>
                {!hideUserColumns &&
                    <>
                        <Th>User</Th>
                        <Th>Role</Th>
                    </>
                }
                <Th>Object</Th>
            </Tr>
        </Thead>
        <Tbody>
            {auditLog.length === 0 && <NoResultsTableRow numColumns={numColumns} />}
            {auditLog.map(entry => {
                return <Tr key={entry.id}>
                    <Td>
                        <Badge>{entry.action}</Badge>
                    </Td>
                    <Td><Ipv4Link value={entry.client_ip} /></Td>
                    <Td>{entry.user_agent ? <UserAgentLabel userAgent={entry.user_agent} /> : '-'}</Td>
                    <Td>{entry.insert_ts}</Td>
                    {!hideUserColumns &&
                        <>
                            <Td>{entry.user_name ?
                                <UserLink userId={entry.user_id}>{entry.user_name}</UserLink> : '-'}</Td>
                            <Td><UserRoleBadge role={entry.user_role} /></Td>
                        </>
                    }
                    <Td>{entry.object}</Td>
                </Tr>
            })}
        </Tbody>
    </Table>
}

export default AuditLogsTable;
