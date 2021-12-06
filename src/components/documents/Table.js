import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import LinkButton from "components/ui/buttons/Link";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import UserLink from "components/users/Link";
import React from "react";
import NoResultsTableRow from "../ui/NoResultsTableRow";
import DocumentBadge from "./Badge";

const DocumentsTable = ({ documents, onDeleteButtonClick }) => {
    return <table>
        <thead>
            <tr>
                <th style={{ width: '190px' }}>Title</th>
                <th>Content</th>
                <th style={{ width: '200px' }}>Creation time</th>
                <th style={{ width: '140px' }}>Author</th>
                <th style={{ width: '140px' }}>Visibility</th>
                <th>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
            {documents.length === 0 && <NoResultsTableRow numColumns={5} />}
            {documents.map((document, index) =>
                <tr key={`doc_${index}`}>
                    <td><DocumentBadge document={document} /></td>
                    <td className="truncate">{document.content}</td>
                    <td><RelativeDateFormatter date={document.insert_ts} /></td>
                    <td><UserLink userId={document.user_id}>{document.user_name}</UserLink></td>
                    <td>{document.visibility}</td>
                    <td className="flex justify-end">
                        <LinkButton href={`/documents/${document.id}/edit`}>Edit</LinkButton>
                        <DeleteIconButton onClick={ev => onDeleteButtonClick(document.id)} />
                    </td>
                </tr>
            )}
        </tbody>
    </table>
}

export default DocumentsTable;
