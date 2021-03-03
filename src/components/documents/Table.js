import LinkButton from "components/ui/buttons/Link";
import React from "react";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import DeleteButton from "../ui/buttons/Delete";
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
                <tr>
                    <td><DocumentBadge document={document} /></td>
                    <td className="truncate">{document.content}</td>
                    <td><ReactTimeAgo date={document.insert_ts} /></td>
                    <td>{document.user_name}</td>
                    <td>{document.visibility}</td>
                    <td className="flex justify-end">
                        <LinkButton href={`/documents/${document.id}/edit`}>Edit</LinkButton>
                        <DeleteButton onClick={ev => onDeleteButtonClick(document.id)} />
                    </td>
                </tr>
            )}
        </tbody>
    </table>
}

export default DocumentsTable;
