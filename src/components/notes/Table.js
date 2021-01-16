import DeleteButton from "../ui/buttons/Delete";
import React from "react";
import NoResultsTableRow from "../ui/NoResultsTableRow";

const NotesTable = ({notes, onDeleteButtonClick}) => {
    return <table>
        <thead>
        <tr>
            <th style={{width: '200px'}}>Creation time</th>
            <th style={{width: '140px'}}>Author</th>
            <th style={{width: '140px'}}>Visibility</th>
            <th>Content</th>
            <th>&nbsp;</th>
        </tr>
        </thead>
        <tbody>
        {notes.length === 0 && <NoResultsTableRow numColumns={5}/>}
        {notes.map((note, index) =>
            <tr>
                <td>{note.insert_ts}</td>
                <td>{note.user_name}</td>
                <td>{note.visibility}</td>
                <td>{note.content}</td>
                <td><DeleteButton onClick={ev => onDeleteButtonClick(ev, note)}/></td>
            </tr>
        )}
        </tbody>
    </table>
}

export default NotesTable;
