import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import VulnerabilityBadge from "components/badges/VulnerabilityBadge";
import Loading from "components/ui/Loading";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import useFetch from "hooks/useFetch";

const RecentVulnerabilitiesWidget = () => {
    const [vulnerabilities] = useFetch(`/vulnerabilities?limit=5&orderColumn=insert_ts&orderDirection=desc`)

    if (!vulnerabilities) return <Loading />

    return <article className="card">
        <h4>Recent vulnerabilities</h4>

        {vulnerabilities.length === 0 ?
            <p>No vulnerabilities to show.</p>
            :
            <Table size="sm">
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
    </article>
}

export default RecentVulnerabilitiesWidget;
