import { Button, Input, Select } from '@chakra-ui/react';
import NativeCheckbox from 'components/form/NativeCheckbox';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import DeleteIconButton from 'components/ui/buttons/DeleteIconButton';
import LinkButton from "components/ui/buttons/Link";
import NoResultsTableRow from 'components/ui/tables/NoResultsTableRow';
import { actionCompletedToast, errorToast } from 'components/ui/toast';
import useFetch from 'hooks/useFetch';
import Vault from 'models/Vault';
import { useState } from 'react';
import secureApiFetch from 'services/api';


const ProjectVaultTab = ({ project }) => {
    const [vault, refreshVault] = useFetch(`/vault/${project.id}`);
    const [vaultItem, setVaultItem] = useState({ ...Vault });

    const onVaultItemFormChange = ev => {
        const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
        setVaultItem({ ...vaultItem, [ev.target.name]: value });
    }

    const onVaultItemDelete = vaultItemId => {
        secureApiFetch(`/vault/${project.id}/${vaultItemId}`, { method: 'DELETE' })
            .then(() => {
                refreshVault();
                actionCompletedToast("The vault item has been deleted.");
            })
            .catch(err => console.error(err))
    }

    const onFormSubmit = ev => {
        ev.preventDefault();

        secureApiFetch(`/vault/${project.id}`, { method: 'POST', body: JSON.stringify(vaultItem) })
            .then(resp => {
                if (resp.status === 201) {
                    setVaultItem({ ...Vault });
                    refreshVault();
                    actionCompletedToast(`The vault item has been added.`);
                } else {
                    errorToast("The vault item could not be saved. Review the form data or check the application logs.")
                }
            })
    }

    return <section>
        <RestrictedComponent roles={['administrator', 'superuser', 'user']} message="(access restricted)">
            {vault && <>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Note</th>
                            <th>Type</th>
                            <th>Reportable</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {0 === vault.length && <NoResultsTableRow numColumns={3} />}
                        {vault.map(item => <>
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.note}</td>
                                <td>{item.type}</td>
                                <td>{item.reportable}</td>
                                <td textAlign="right">
                                    <LinkButton href={`/vault/${project.id}/${item.id}/edit`}>Edit</LinkButton>
                                    <DeleteIconButton onClick={onVaultItemDelete.bind(this, item.id)} />
                                </td>
                            </tr>
                        </>)}
                    </tbody>
                </table>
                <form onSubmit={onFormSubmit}>
                    <h3>New vault item</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Note</th>
                                <th>Value</th>
                                <th>Password</th>
                                <th>Reportable</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Select name="type" onChange={onVaultItemFormChange} value={vaultItem.type || ""} isRequired>
                                        <option value="password">Password</option>
                                        <option value="note">Note</option>
                                        <option value="token">Token</option>
                                        <option value="key">Key</option>
                                    </Select>
                                </td>
                                <td>
                                    <Input type="text" name="name" onChange={onVaultItemFormChange} value={vaultItem.name || ""} isRequired />
                                </td>
                                <td>
                                    <Input type="text" name="note" onChange={onVaultItemFormChange} value={vaultItem.note || ""} />
                                </td>
                                <td>
                                    <Input type="text" name="value" onChange={onVaultItemFormChange} value={vaultItem.value || ""} isRequired />
                                </td>
                                <td>
                                    <Input type="password" name="password" onChange={onVaultItemFormChange} value={vaultItem.password || ""} isRequired />
                                </td>
                                <td>
                                    <NativeCheckbox name="reportable" onChange={onVaultItemFormChange} checked={vaultItem.reportable} />
                                </td>
                                <td>
                                    <Button type="submit">Add</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </>}
        </RestrictedComponent>
    </section>;
}

export default ProjectVaultTab;
