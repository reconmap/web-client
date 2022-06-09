import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import VulnerabilityBadge from "components/badges/VulnerabilityBadge";
import Loading from "components/ui/Loading";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import useFetch from "hooks/useFetch";
import DashboardWidget from "./Widget";

const RecentVulnerabilitiesWidget = () => {
    const [vulnerabilities] = useFetch(`/vulnerabilities?limit=5&orderColumn=insert_ts&orderDirection=desc`)

    if (!vulnerabilities) return <Loading />

    return <DashboardWidget title="Recent vulnerabilities">

        {vulnerabilities.length === 0 ?
            <p>No vulnerabilities to show.</p>
            :
            <Table>
                <Thead>
                    <Tr>
                        <Th>Summary</Th>
                        <Th>Created</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {vulnerabilities.map(vulnerability => <Tr key={vulnerability.id}>
                        <Td><VulnerabilityBadge key={vulnerability.id} vulnerability={vulnerability} /></Td>
                        <Td><RelativeDateFormatter date={vulnerability.insert_ts} /></Td>
                    </Tr>)}
                </Tbody>
            </Table>
        }
    </DashboardWidget>
}

export default RecentVulnerabilitiesWidget;
