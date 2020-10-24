import useSetTitle from '../../hooks/useSetTitle';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import DeleteButton from "../ui/buttons/Delete";
import ExternalLink from "../ui/ExternalLink";
import {ClientLink} from "./Link";
import CreateButton from "../ui/buttons/Create";

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

        {!clients ?
            <Loading/> :
            clients.length === 0 ?
                <NoResults/> :
                <table >
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>URL</th>
                        <th>Contact name</th>
                        <th>Contact email</th>
                        <th>Contact phone</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.map((client) =>
                        <tr key={client.id}>
                            <td><ClientLink clientId={client.id}>{client.name}</ClientLink></td>
                            <td>{client.url ? <ExternalLink href={client.url}>{client.url}</ExternalLink> : '-'}</td>
                            <td>{client.contact_name || '-'}</td>
                            <td>{client.contact_email || '-'}</td>
                            <td>{client.contact_phone || '-'}</td>
                            <td><DeleteButton onClick={() => destroy(client.id)}/></td>
                        </tr>
                    )}
                    </tbody>
                </table>

        }
    </>
}

export default ClientsList
