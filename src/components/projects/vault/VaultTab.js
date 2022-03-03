import { Button, Input, Table, Tbody, Td, Th, Thead, Tr, Select } from '@chakra-ui/react';
import { useState } from 'react';
import DeleteIconButton from 'components/ui/buttons/DeleteIconButton';
import NoResultsTableRow from 'components/ui/tables/NoResultsTableRow';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import useFetch from 'hooks/useFetch';
import { actionCompletedToast, errorToast } from 'components/ui/toast';
import secureApiFetch from 'services/api';
import Vault from 'models/Vault';
import LinkButton from "components/ui/buttons/Link";


const ProjectVaultTab = ({ project }) => {
    const [vault, refreshVault] = useFetch(`/vault/${project.id}`);
    const [vaultItem, setVaultItem] = useState(new Vault());

    const onVaultItemFormChange = ev => {
        setVaultItem({ ...vaultItem, [ev.target.name]: ev.target.value });
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
                    setVaultItem(new Vault());
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
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Note</Th>
                            <Th>Type</Th>
                            <Th>&nbsp;</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {0 === vault.length && <NoResultsTableRow numColumns={3} />}
                        {vault.map(item => <>
                            <Tr key={item.id}>
                                <Td>{item.name}</Td>
                                <Td>{item.note}</Td>
                                <Td>{item.type}</Td>
                                <Td className='flex justify-end'>
                                    <LinkButton href={`/vault/${project.id}/${item.id}/edit`}>Edit</LinkButton>
                                    <DeleteIconButton onClick={onVaultItemDelete.bind(this, item.id)} />
                                </Td>
                            </Tr>
                        </>)}
                    </Tbody>
                </Table>
                <form onSubmit={onFormSubmit}>
                    <h3>New vault item</h3>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Type</Th>
                                <Th>Name</Th>
                                <Th>Note</Th>
                                <Th>Value</Th>
                                <Th>Password</Th>
                                <Th>&nbsp;</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    <Select name="type" onChange={onVaultItemFormChange} value={vaultItem.type || ""} isRequired>
                                        <option value="password">Password</option>
                                        <option value="note">Note</option>
                                        <option value="token">Token</option>
                                        <option value="key">Key</option>
                                    </Select>
                                </Td>
                                <Td>
                                    <Input type="text" name="name" onChange={onVaultItemFormChange} value={vaultItem.name || ""} isRequired />
                                </Td>
                                <Td>
                                    <Input type="text" name="note" onChange={onVaultItemFormChange} value={vaultItem.note || ""} />
                                </Td>
                                <Td>
                                    <Input type="text" name="value" onChange={onVaultItemFormChange} value={vaultItem.value || ""} isRequired />
                                </Td>
                                <Td>
                                    <Input type="password" name="password" onChange={onVaultItemFormChange}  value={vaultItem.password || ""} isRequired />
                                </Td>
                                <Td>
                                    <Button type="submit">Add</Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </form>
            </>}
        </RestrictedComponent>
    </section>;
}

export default ProjectVaultTab;
