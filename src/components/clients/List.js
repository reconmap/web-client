import { ButtonGroup, IconButton, Menu, MenuButton, MenuItem, MenuList, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageTitle from 'components/logic/PageTitle';
import DeleteIconButton from 'components/ui/buttons/DeleteIconButton';
import LoadingTableRow from 'components/ui/tables/LoadingTableRow';
import NoResultsTableRow from 'components/ui/tables/NoResultsTableRow';
import { useNavigate } from 'react-router-dom';
import { downloadFromApi } from 'services/api';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import CreateButton from "../ui/buttons/Create";
import LinkButton from "../ui/buttons/Link";
import ExternalLink from "../ui/ExternalLink";
import { IconBriefcase } from '../ui/Icons';
import Title from '../ui/Title';
import ClientLink from "./Link";

const ClientsList = () => {
    const navigate = useNavigate();
    const [clients, updateTasks] = useFetch('/clients')

    const destroy = useDelete('/clients/', updateTasks);

    const handleCreateClient = () => {
        navigate(`/clients/create`)
    }

    const onExportClick = ev => {
        downloadFromApi('/system/data?entities=client');
    }

    return <>
        <PageTitle value="Clients" />
        <div className='heading'>
            <Breadcrumb />

            <ButtonGroup>
                <CreateButton onClick={handleCreateClient}>Add client</CreateButton>
                <Menu>
                    <MenuButton as={IconButton} aria-label='Options' icon={<FontAwesomeIcon icon={faEllipsis} />} variant='outline' />
                    <MenuList>
                        <MenuItem onClick={onExportClick}>Export</MenuItem>
                    </MenuList>
                </Menu>
            </ButtonGroup>
        </div>
        <Title title='Clients' icon={<IconBriefcase />} />

        <Table>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Address</Th>
                    <Th>URL</Th>
                    <Th>Number of contacts</Th>
                    <Th>&nbsp;</Th>
                </Tr>
            </Thead>
            <Tbody>
                {null === clients && <LoadingTableRow numColumns={5} />}
                {null !== clients && 0 === clients.length && <NoResultsTableRow numColumns={5} />}
                {null !== clients && 0 < clients.length && clients.map(client =>
                    <Tr key={client.id}>
                        <Td><ClientLink clientId={client.id}>{client.name}</ClientLink></Td>
                        <Td>{client.address || '-'}</Td>
                        <Td>{client.url ? <ExternalLink href={client.url}>{client.url}</ExternalLink> : '-'}</Td>
                        <Td>{client.num_contacts}</Td>
                        <Td className='flex justify-end'>
                            <LinkButton href={`/clients/${client.id}/edit`}>Edit</LinkButton>
                            <DeleteIconButton onClick={() => destroy(client.id)} />
                        </Td>
                    </Tr>
                )
                }
            </Tbody>
        </Table>
    </>
}

export default ClientsList
