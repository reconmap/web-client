import NativeButton from "components/form/NativeButton.jsx";
import NativeInput from "components/form/NativeInput.jsx";
import NativeSelect from "components/form/NativeSelect.jsx";
import { actionCompletedToast } from "components/ui/toast.jsx";
import Vault from "models/Vault.js";
import { useState } from "react";
import secureApiFetch from "services/api.js";

const VaultSecretForm = ({ projectId = null, onSubmit = null }) => {
    const defaultSecret = { ...Vault, project_id: projectId };
    const [vaultItem, setVaultItem] = useState(defaultSecret);

    const onVaultItemFormChange = (ev) => {
        const value = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
        setVaultItem({ ...vaultItem, [ev.target.name]: value });
    };

    const onFormSubmit = (ev) => {
        ev.preventDefault();

        secureApiFetch(`/vault`, {
            method: "POST",
            body: JSON.stringify(vaultItem),
        }).then((resp) => {
            if (resp.status === 201) {
                setVaultItem(defaultSecret);
                if (onSubmit) onSubmit();
                actionCompletedToast(`The vault item has been added.`);
            } else {
                errorToast("The vault item could not be saved. Review the form data or check the application logs.");
            }
        });
    };

    return (
        <form onSubmit={onFormSubmit}>
            <h3>New vault secret</h3>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Value</th>
                        <th>URL</th>
                        <th>Expiration date</th>
                        <th>Note</th>
                        <th>Protection password</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <NativeSelect
                                name="type"
                                onChange={onVaultItemFormChange}
                                value={vaultItem.type || ""}
                                required
                            >
                                <option value="password">Password</option>
                                <option value="note">Note</option>
                                <option value="token">Token</option>
                                <option value="key">Key</option>
                            </NativeSelect>
                        </td>
                        <td>
                            <NativeInput
                                type="text"
                                name="name"
                                onChange={onVaultItemFormChange}
                                value={vaultItem.name || ""}
                                required
                            />
                        </td>
                        <td>
                            <NativeInput
                                type="text"
                                name="value"
                                onChange={onVaultItemFormChange}
                                value={vaultItem.value || ""}
                                required
                            />
                        </td>
                        <td>
                            <NativeInput
                                type="url"
                                name="url"
                                onChange={onVaultItemFormChange}
                                value={vaultItem.url || ""}
                            />
                        </td>
                        <td>
                            <NativeInput
                                type="date"
                                name="expiration_date"
                                onChange={onVaultItemFormChange}
                                value={vaultItem.expiration_date || ""}
                            />
                        </td>
                        <td>
                            <NativeInput
                                type="text"
                                name="note"
                                onChange={onVaultItemFormChange}
                                value={vaultItem.note || ""}
                            />
                        </td>
                        <td>
                            <NativeInput
                                type="password"
                                name="password"
                                onChange={onVaultItemFormChange}
                                value={vaultItem.password || ""}
                                autoComplete="off"
                                required
                            />
                        </td>
                        <td>
                            <NativeButton type="submit">Add</NativeButton>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
};

export default VaultSecretForm;
