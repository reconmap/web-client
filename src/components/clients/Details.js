import React, {useEffect} from 'react'
import DeleteButton from '../ui/buttons/Delete';
import Title from '../ui/Title';
import Timestamps from "../ui/Timestamps";
import ExternalLink from "../ui/ExternalLink";
import {IconBriefcase} from '../ui/Icons';
import {Link, useHistory, useRouteMatch} from 'react-router-dom';
import useFetch from './../../hooks/useFetch'
import useDelete from './../../hooks/useDelete'
import Loading from './../ui/Loading'
import Breadcrumb from "../ui/Breadcrumb";

const ClientDetails = () => {
    const {params: {clientId}} = useRouteMatch()
    const history = useHistory()

    const [client] = useFetch(`/clients/${clientId}`)
    const deleteClient = useDelete(`/clients/`)

    useEffect(() => {
        if (client) document.title = `${client.name} - Client | Reconmap`;
    }, [client])

    const handleDelete = async () => {
        const confirmed = await deleteClient(clientId);
        if (confirmed)
            history.push('/clients');
    }

    if (!client) {
        return <Loading/>
    }
    return <div>
        <div className='heading'>
            <Breadcrumb>
                <Link to="/clients">Clients</Link>
            </Breadcrumb>
            <DeleteButton onClick={handleDelete}/>
        </div>
        <article>
            <div>
                <Title type='Client' title={client.name} icon={<IconBriefcase/>}/>
            </div>
            <Timestamps insertTs={client.insert_ts} updateTs={client.update_ts}/>
            <h4>Details</h4>
            <table className="table-details">
                <tbody>
                <tr>
                    <td>Name</td>
                    <td>{client.name}</td>
                </tr>
                <tr>
                    <td>URL</td>
                    <td><ExternalLink href={client.url}>{client.url}</ExternalLink></td>
                </tr>
                <tr>
                    <td>Contact name</td>
                    <td>{client.contact_name}</td>
                </tr>
                <tr>
                    <td>Contact email</td>
                    <td>{client.contact_email}</td>
                </tr>
                <tr>
                    <td>Contact phone</td>
                    <td>{client.contact_phone}</td>
                </tr>
                </tbody>
            </table>
        </article>
    </div>
}

export default ClientDetails
