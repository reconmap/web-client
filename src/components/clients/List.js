import useSetTitle from '../../hooks/useSetTitle';
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import DeleteButton from "../ui/buttons/Delete";
import ExternalLink from "../ui/ExternalLink";
import {ClientLink} from "./Link";
import CreateButton from "../ui/buttons/Create";
import Title from '../ui/Title';
import {IconBriefcase} from '../ui/Icons';
import NoResults from "../ui/NoResults";

const ClientsList = ({history}) => {
    useSetTitle('Clients');
    const [clients, updateTasks] = useFetch('/clients')

    const destroy = useDelete('/clients/', updateTasks);
    const handleCreateClient = () => {
        history.push(`/clients/create`)
    }
    return <>

        <div className='heading'>
            <Breadcrumb history={history}/>

            <CreateButton onClick={handleCreateClient}>Create Client</CreateButton>
        </div>
        <Title title='Clients' icon={<IconBriefcase/>}/>

        {!clients ?
            <Loading/> :
            <table>
                <thead>
                <tr>
                    <th style={{width: '190px'}}>Name</th>
                    <th>URL</th>
                    <th>Contact name</th>
                    <th>Contact email</th>
                    <th>Contact phone</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {clients.length === 0 ?
                    <td colspan="6"><NoResults/></td> :
                    clients.map((client) =>
                        <tr key={client.id}>
                            <td><ClientLink clientId={client.id}>{client.name}</ClientLink></td>
                            <td>{client.url ? <ExternalLink href={client.url}>{client.url}</ExternalLink> : '-'}</td>
                            <td>{client.contact_name || '-'}</td>
                            <td>{client.contact_email || '-'}</td>
                            <td>{client.contact_phone || '-'}</td>
                            <td><DeleteButton onClick={() => destroy(client.id)}/></td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        }
    </>
}

export default ClientsList
