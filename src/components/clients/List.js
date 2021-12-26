import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import DeleteIconButton from 'components/ui/buttons/DeleteIconButton';
import MailLink from "components/ui/MailLink";
import TelephoneLink from "components/ui/TelephoneLink";
import { useNavigate } from 'react-router-dom';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import CreateButton from "../ui/buttons/Create";
import LinkButton from "../ui/buttons/Link";
import ExternalLink from "../ui/ExternalLink";
import { IconBriefcase } from '../ui/Icons';
import Loading from '../ui/Loading';
import NoResults from "../ui/NoResults";
import Title from '../ui/Title';
import ClientLink from "./Link";

const ClientsList = () => {
    const navigate = useNavigate();
    const [clients, updateTasks] = useFetch('/clients')

    const destroy = useDelete('/clients/', updateTasks);
    const handleCreateClient = () => {
        navigate(`/clients/create`)
    }

    return <>
        <PageTitle value="Clients" />
        <div className='heading'>
            <Breadcrumb />

            <CreateButton onClick={handleCreateClient}>Create Client</CreateButton>
        </div>
        <Title title='Clients' icon={<IconBriefcase />} />

        {!clients ?
            <Loading /> :
            <Table size="sm">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Address</Th>
                        <Th>URL</Th>
                        <Th>Contact name</Th>
                        <Th>Contact email</Th>
                        <Th colSpan={2}>Contact phone</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {clients.length === 0 ?
                        <Tr>
                            <Td colSpan={6}><NoResults /></Td>
                        </Tr> :
                        clients.map((client) =>
                            <Tr key={client.id}>
                                <Td><ClientLink clientId={client.id}>{client.name}</ClientLink></Td>
                                <Td>{client.address || '-'}</Td>
                                <Td>{client.url ? <ExternalLink href={client.url}>{client.url}</ExternalLink> : '-'}</Td>
                                <Td>{client.contact_name || '-'}</Td>
                                <Td><MailLink email={client.contact_email} /></Td>
                                <Td><TelephoneLink number={client.contact_phone} /></Td>
                                <Td className='flex justify-end'>
                                    <LinkButton href={`/clients/${client.id}/edit`}>Edit</LinkButton>
                                    <DeleteIconButton onClick={() => destroy(client.id)} />
                                </Td>
                            </Tr>
                        )
                    }
                </Tbody>
            </Table>
        }
    </>
}

export default ClientsList
