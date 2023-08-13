import RestrictedComponent from "components/logic/RestrictedComponent";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import VisibilityLegend from "components/ui/VisibilityLegend";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import UserLink from "components/users/Link";
import ReactMarkdown from "react-markdown";
import NoResultsTableRow from "../ui/tables/NoResultsTableRow";

const NotesTable = ({ notes, onDeleteButtonClick }) => {
    return <table className="rm-listing">
        <thead>
            <tr>
                <th>Content</th>
                <th style={{ width: '200px' }}>Creation time</th>
                <th style={{ width: '140px' }}>Author</th>
                <th style={{ width: '140px' }}>Visibility</th>
                <th>&nbsp;</th>
            </tr>
        </thead>
        {notes &&
        <tbody>
            {notes.length === 0 && <NoResultsTableRow numColumns={5} />}
            {notes.map((note, index) =>
                <tr key={index}>
                    <td><ReactMarkdown>{note.content}</ReactMarkdown></td>
                    <td><RelativeDateFormatter date={note.insert_ts} /></td>
                    <td><UserLink userId={note.user_id}>{note.user_name}</UserLink></td>
                    <td><VisibilityLegend visibility={note.visibility} /></td>
                    <td>
                        <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                            <DeleteIconButton onClick={ev => onDeleteButtonClick(ev, note)} />
                        </RestrictedComponent>
                    </td>
                </tr>
            )}
            </tbody>}
    </table>
}

export default NotesTable;
