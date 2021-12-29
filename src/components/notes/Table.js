import { Th } from "@chakra-ui/react";
import RestrictedComponent from "components/logic/RestrictedComponent";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import VisibilityLegend from "components/ui/VisibilityLegend";
import UserLink from "components/users/Link";
import React from "react";
import ReactMarkdown from "react-markdown";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import NoResultsTableRow from "../ui/NoResultsTableRow";

const NotesTable = ({ notes, onDeleteButtonClick }) => {
    return <table>
        <thead>
            <tr>
                <Th>Content</Th>
                <Th style={{ width: '200px' }}>Creation time</Th>
                <Th style={{ width: '140px' }}>Author</Th>
                <Th style={{ width: '140px' }}>Visibility</Th>
                <Th>&nbsp;</Th>
            </tr>
        </thead>
        <tbody>
            {notes.length === 0 && <NoResultsTableRow numColumns={5} />}
            {notes.map((note, index) =>
                <tr>
                    <td><ReactMarkdown>{note.content}</ReactMarkdown></td>
                    <td><ReactTimeAgo date={note.insert_ts} /></td>
                    <td><UserLink userId={note.user_id}>{note.user_name}</UserLink></td>
                    <td><VisibilityLegend visibility={note.visibility} /></td>
                    <td>
                        <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                            <DeleteIconButton onClick={ev => onDeleteButtonClick(ev, note)} />
                        </RestrictedComponent>
                    </td>
                </tr>
            )}
        </tbody>
    </table>
}

export default NotesTable;
