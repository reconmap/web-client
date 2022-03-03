import { Button } from "@chakra-ui/react";
import { Input, Table, Tbody, Td, Th, Thead, Tr, Select } from '@chakra-ui/react';
import { actionCompletedToast, errorToast } from "components/ui/toast";
import { useState } from "react";
import secureApiFetch from "services/api";
import { useNavigate, useParams } from "react-router-dom";
import Vault from 'models/Vault';

const VaultItemEdit = () => {
    const { projectId, vaultItemId} = useParams();
    const navigate = useNavigate();

    const [item, setVaultItem] = useState(new Vault());
    const [password, setPassword] = useState(null);

    const onVaultItemFormChange = ev => {
        setVaultItem({ ...item, [ev.target.name]: ev.target.value });
    }

    const onFormSubmit = ev => {
        ev.preventDefault();

        item.password = password;

        secureApiFetch(`/vault/${projectId}/${vaultItemId}`, { method: 'PUT', body: JSON.stringify(item) })
            .then(resp => {
                if (resp.status === 201) {
                    setVaultItem(new Vault());
                    setPassword(null);
                    actionCompletedToast(`The vault item has been modified.`);
                    navigate(`/projects/${projectId}`);
                } else {
                    errorToast("The vault item could not be saved. Review the form data or check the application logs.")
                }
            })
    }

    const onPasswordProvided = ev => {
        ev.preventDefault();

        secureApiFetch(`/vault/${projectId}/${vaultItemId}`, { method: 'POST', body: JSON.stringify({ 'password' : password }) })
            .then(response => response.json())
            .then(json => {
                debugger;
                if (json['success'] === false)
                {
                    errorToast("Seems like a wrong password.");
                    setPassword(null);
                }
                else 
                {
                    var newItem = new Vault();
                    newItem.name = json['name'];
                    newItem.note = json['note'];
                    newItem.value = json['value'];
                    newItem.type = json['type'];
                    setVaultItem(newItem);
                    actionCompletedToast(`The vault item "${newItem.name}" has been loaded.`);
                }
            })
            .catch(err => {
                errorToast(err);
                setPassword(null);
            })
    }

    const onPasswordFormChanged = ev => {
        setPassword(ev.target.value);
    }

    return (<div>
        {item.name !== "" && <>
                <form onSubmit={onFormSubmit}>
                    <h3>Vault item</h3>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Type</Th>
                                <Th>Name</Th>
                                <Th>Note</Th>
                                <Th>Value</Th>
                                <Th>&nbsp;</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    <Select name="type" onChange={onVaultItemFormChange} value={item.type || ""} isRequired>
                                        <option value="password">Password</option>
                                        <option value="note">Note</option>
                                        <option value="token">Token</option>
                                        <option value="key">Key</option>
                                    </Select>
                                </Td>
                                <Td>
                                    <Input type="text" name="name" onChange={onVaultItemFormChange} value={item.name || ""} isRequired />
                                </Td>
                                <Td>
                                    <Input type="text" name="note" onChange={onVaultItemFormChange} value={item.note || ""} />
                                </Td>
                                <Td>
                                    <Input type="text" name="value" onChange={onVaultItemFormChange} value={item.value || ""} isRequired />
                                </Td>
                                <Td>
                                    <Button type="submit">Update</Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </form>
            </>}
            {item.name === "" && <>
                <h3>Please provide password</h3>
                <form onSubmit={onPasswordProvided}>
                        <Input type="password" name="password" onChange={onPasswordFormChanged} value={password || "" } isRequired />
                        <Button type="submit">Send</Button>
                </form>
            </>}
            </div>
    )
}
export default VaultItemEdit;