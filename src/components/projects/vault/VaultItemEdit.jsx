import NativeButton from "components/form/NativeButton";
import NativeCheckbox from "components/form/NativeCheckbox";
import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
import { actionCompletedToast, errorToast } from "components/ui/toast";
import Vault from "models/Vault";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "services/api";

const VaultItemEdit = () => {
    const { projectId, vaultItemId } = useParams();
    const navigate = useNavigate();

    const [item, setVaultItem] = useState({ ...Vault });
    const [password, setPassword] = useState(null);

    const onVaultItemFormChange = (ev) => {
        const value = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
        setVaultItem({ ...item, [ev.target.name]: value });
    };

    const onFormSubmit = (ev) => {
        ev.preventDefault();

        item.password = password;

        secureApiFetch(`/vault/${projectId}/${vaultItemId}`, { method: "PUT", body: JSON.stringify(item) }).then(
            (resp) => {
                if (resp.status === 201) {
                    setVaultItem({ ...Vault });
                    setPassword(null);
                    actionCompletedToast(`The vault item has been modified.`);
                    navigate(`/projects/${projectId}`);
                } else {
                    errorToast(
                        "The vault item could not be saved. Review the form data or check the application logs.",
                    );
                }
            },
        );
    };

    const onPasswordProvided = (ev) => {
        ev.preventDefault();

        secureApiFetch(`/vault/${projectId}/${vaultItemId}`, {
            method: "POST",
            body: JSON.stringify({ password: password }),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json["success"] === false) {
                    errorToast("Seems like a wrong password.");
                    setPassword(null);
                } else {
                    var newItem = { ...Vault };
                    newItem.name = json["name"];
                    newItem.note = json["note"];
                    newItem.value = json["value"];
                    newItem.type = json["type"];
                    newItem.reportable = json["reportable"];
                    setVaultItem(newItem);
                    actionCompletedToast(`The vault item "${newItem.name}" has been loaded.`);
                }
            })
            .catch((err) => {
                errorToast(err);
                setPassword(null);
            });
    };

    const onPasswordFormChanged = (ev) => {
        setPassword(ev.target.value);
    };

    return (
        <div>
            {item.name !== "" && (
                <>
                    <form onSubmit={onFormSubmit}>
                        <h3>Vault item</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Note</th>
                                    <th>Value</th>
                                    <th>Reportable</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <NativeSelect
                                            name="type"
                                            onChange={onVaultItemFormChange}
                                            value={item.type || ""}
                                            isRequired
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
                                            value={item.name || ""}
                                            isRequired
                                        />
                                    </td>
                                    <td>
                                        <NativeInput
                                            type="text"
                                            name="note"
                                            onChange={onVaultItemFormChange}
                                            value={item.note || ""}
                                        />
                                    </td>
                                    <td>
                                        <NativeInput
                                            type="text"
                                            name="value"
                                            onChange={onVaultItemFormChange}
                                            value={item.value || ""}
                                            isRequired
                                        />
                                    </td>
                                    <td>
                                        <NativeCheckbox
                                            name="reportable"
                                            onChange={onVaultItemFormChange}
                                            checked={item.reportable}
                                        />
                                    </td>
                                    <td>
                                        <NativeButton type="submit">Update</NativeButton>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </>
            )}
            {item.name === "" && (
                <>
                    <h3>Please provide password</h3>
                    <form onSubmit={onPasswordProvided}>
                        <NativeInput
                            type="password"
                            name="password"
                            onChange={onPasswordFormChanged}
                            value={password || ""}
                            isRequired
                        />
                        <NativeButton type="submit">Send</NativeButton>
                    </form>
                </>
            )}
        </div>
    );
};

export default VaultItemEdit;
