import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import Badge from "components/badges/Badge";
import UserLink from "components/users/Link";
import useFetch from "hooks/useFetch";
import DashboardWidget from "./Widget";

const RecentActivityWidget = () => {
    const [auditLog] = useFetch('/auditlog?limit=5');

    return <DashboardWidget title="Recent activity">

        {auditLog && auditLog.length > 0 ?
            <Table>
                <Thead>
                    <Tr>
                        <Th>Action</Th>
                        <Th>User</Th>
                        <Th>Date/Time</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {auditLog.map(log => <Tr key={log.id}>
                        <Td><Badge>{log.action}</Badge></Td>
                        <Td>{log.user_name ?
                            <UserLink userId={log.user_id}>{log.user_name}</UserLink> : '-'}</Td>
                        <Td>{log.insert_ts}</Td>
                    </Tr>)}
                </Tbody>
            </Table> :
            <p>No activity to show.</p>
        }
    </DashboardWidget>
}

export default RecentActivityWidget;
