import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import RestrictedComponent from "components/logic/RestrictedComponent";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import VisibilityLegend from "components/ui/VisibilityLegend";
import UserLink from "components/users/Link";
import ReactMarkdown from "react-markdown";
import ReactTimeAgo from "react-time-ago";
import NoResultsTableRow from "../ui/tables/NoResultsTableRow";

const NotesTable = ({ notes, onDeleteButtonClick }) => {
    return <Table>
        <Thead>
            <Tr>
                <Th>Content</Th>
                <Th style={{ width: '200px' }}>Creation time</Th>
                <Th style={{ width: '140px' }}>Author</Th>
                <Th style={{ width: '140px' }}>Visibility</Th>
                <Th>&nbsp;</Th>
            </Tr>
        </Thead>
        <Tbody>
            {notes.length === 0 && <NoResultsTableRow numColumns={5} />}
            {notes.map((note, index) =>
                <Tr>
                    <Td><ReactMarkdown>{note.content}</ReactMarkdown></Td>
                    <Td><ReactTimeAgo date={note.insert_ts} /></Td>
                    <Td><UserLink userId={note.user_id}>{note.user_name}</UserLink></Td>
                    <Td><VisibilityLegend visibility={note.visibility} /></Td>
                    <Td>
                        <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                            <DeleteIconButton onClick={ev => onDeleteButtonClick(ev, note)} />
                        </RestrictedComponent>
                    </Td>
                </Tr>
            )}
        </Tbody>
    </Table>
}

export default NotesTable;
