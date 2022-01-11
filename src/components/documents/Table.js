import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import LinkButton from "components/ui/buttons/Link";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import VisibilityLegend from "components/ui/VisibilityLegend";
import UserLink from "components/users/Link";
import NoResultsTableRow from "../ui/tables/NoResultsTableRow";
import DocumentBadge from "./Badge";

const DocumentsTable = ({ documents, onDeleteButtonClick }) => {
    return <Table>
        <Thead>
            <Tr>
                <Th>Title</Th>
                <Th>Content</Th>
                <Th style={{ width: '200px' }}>Creation time</Th>
                <Th style={{ width: '140px' }}>Author</Th>
                <Th style={{ width: '140px' }}>Visibility</Th>
                <Th>&nbsp;</Th>
            </Tr>
        </Thead>
        <Tbody>
            {documents.length === 0 && <NoResultsTableRow numColumns={6} />}
            {documents.map((document, index) =>
                <Tr key={`doc_${index}`}>
                    <Td><DocumentBadge document={document} /></Td>
                    <Td>{document.content}</Td>
                    <Td><RelativeDateFormatter date={document.insert_ts} /></Td>
                    <Td><UserLink userId={document.user_id}>{document.user_name}</UserLink></Td>
                    <Td><VisibilityLegend visibility={document.visibility} /></Td>
                    <Td style={{ textAlign: "right" }}>
                        <LinkButton href={`/documents/${document.id}/edit`}>Edit</LinkButton>
                        <DeleteIconButton onClick={ev => onDeleteButtonClick(document.id)} />
                    </Td>
                </Tr>
            )}
        </Tbody>
    </Table>
}

export default DocumentsTable;
