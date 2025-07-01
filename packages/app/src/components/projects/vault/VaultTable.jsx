import DeleteIconButton from "components/ui/buttons/DeleteIconButton.jsx";
import LinkButton from "components/ui/buttons/Link.jsx";
import ExternalLink from "components/ui/ExternalLink.jsx";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter.jsx";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow.jsx";
import { actionCompletedToast } from "components/ui/toast.jsx";
import secureApiFetch from "services/api.js";

const VaultTable = ({ secrets, onDelete }) => {
    const onVaultItemDelete = (vaultItemId) => {
        secureApiFetch(`/vault/${vaultItemId}`, {
            method: "DELETE",
        })
            .then(() => {
                if (onDelete) onDelete();
                actionCompletedToast("The vault item has been deleted.");
            })
            .catch((err) => console.error(err));
    };

    return (
        <table className="table is-fullwidth">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>URL</th>
                    <th>Expiration date</th>
                    <th>Notes</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            {secrets && (
                <tbody>
                    {0 === secrets.length && <NoResultsTableRow numColumns={3} />}
                    {secrets.map((item) => (
                        <>
                            <tr key={item.id}>
                                <td>{item.type}</td>
                                <td>{item.name}</td>
                                <td>{item.url ? <ExternalLink href={item.url}>{item.url}</ExternalLink> : "(none)"}</td>
                                <td>
                                    {item.expiration_date ? (
                                        <>
                                            {item.expiration_date}
                                            <br />
                                            (<RelativeDateFormatter date={item.expiration_date} />)
                                        </>
                                    ) : (
                                        "(none)"
                                    )}
                                </td>
                                <td>{item.note}</td>
                                <td>
                                    <LinkButton href={`/vault/${item.id}/edit`}>Edit</LinkButton>
                                    <DeleteIconButton onClick={onVaultItemDelete.bind(this, item.id)} />
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            )}
        </table>
    );
};

export default VaultTable;
