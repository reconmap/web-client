import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import DocumentBadge from "components/documents/Badge";
import Loading from "components/ui/Loading";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import useFetch from "hooks/useFetch";
import DashboardWidget from "./Widget";

const RecentDocumentsWidget = () => {
    const [documents] = useFetch(`/documents?limit=5`)

    if (!documents) return <Loading />

    return <DashboardWidget title="Recent documents">

        {documents.length === 0 ?
            <p>No documents to show.</p>
            :
            <Table>
                <Thead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Created</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {documents.map(doc => <Tr key={doc.id}>
                        <Td><DocumentBadge key={doc.id} document={doc} /></Td>
                        <Td><RelativeDateFormatter date={doc.insert_ts} /></Td>
                    </Tr>)}
                </Tbody>
            </Table>
        }
    </DashboardWidget>
}

export default RecentDocumentsWidget;
