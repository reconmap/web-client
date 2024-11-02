import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import VisibilityLegend from "components/ui/VisibilityLegend";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import LinkButton from "components/ui/buttons/Link";
import LoadingTableRow from "components/ui/tables/LoadingTableRow";
import UserLink from "components/users/Link";
import NoResultsTableRow from "../ui/tables/NoResultsTableRow";
import DocumentBadge from "./Badge";

const DocumentsTable = ({ documents, onDeleteButtonClick }) => {
    return (
        <table className="table is-fullwidth">
            <thead>
                <tr>
                    <th>Title</th>
                    <th style={{ width: "200px" }}>Creation time</th>
                    <th style={{ width: "140px" }}>Author</th>
                    <th style={{ width: "140px" }}>Visibility</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {null === documents && <LoadingTableRow numColumns={6} />}
                {null !== documents && documents.length === 0 && <NoResultsTableRow numColumns={6} />}
                {null !== documents &&
                    documents.map((document, index) => (
                        <tr key={`doc_${index}`}>
                            <td>
                                <DocumentBadge document={document} />
                            </td>
                            <td>
                                <RelativeDateFormatter date={document.insert_ts} />
                            </td>
                            <td>
                                <UserLink userId={document.user_id}>{document.user_name}</UserLink>
                            </td>
                            <td>
                                <VisibilityLegend visibility={document.visibility} />
                            </td>
                            <td style={{ textAlign: "right" }}>
                                <LinkButton href={`/documents/${document.id}/edit`}>Edit</LinkButton>
                                <DeleteIconButton onClick={(ev) => onDeleteButtonClick(document.id)} />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default DocumentsTable;
